import './content.css';
import bigExchangeIcon from './assets/exchange-big.png';
import exchangeIcon from './assets/exchange.png';
import heartIcon from './assets/heart.png';
import SavedUnit from './components/savedUnit';
import { useDispatch, useSelector } from 'react-redux';
import { addUnit, updateGoalUnit, updateServerStatus, updateUnit, updateUnitArray, updateUnitResult } from './scripts/redux/unitActions';
import { Fragment, useEffect, useRef } from 'react';
import { appendUnit, getNextUnitId } from './scripts/data/dataManager';

function ContentComponent()
{
    const dispatch = useDispatch();
    const currentUnit = useSelector(state => state.unit.unitValue);
    const goalUnit = useSelector(state => state.unit.unitGoal);
    const unitResult = useSelector(state => state.unit.unitResult);
    const serverStatus = useSelector(state => state.unit.serverConnected);
    const inputRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:3000/unit", {                
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
         })
        .then((response) => {
          if (response.status >= 400) {
            dispatch(updateServerStatus(false));
            throw new Error("server error");
          }
          return response.json();
        })
        .then((response) => {
            if(response && response.responseStatus === 'validRequest')
            {
                dispatch(updateServerStatus(true));
                dispatch(updateUnitArray(response.units));
            } else {
                dispatch(updateServerStatus(false));
            }
        })
        .catch((error) => {
            dispatch(updateServerStatus(false));
            throw new Error(error);
        })
    }, []);

    const savedUnits = useSelector(state => state.unit.units);

    let unitContent = <Fragment>
        <div className='saved-no-units-caption'>Loading units...</div>
    </Fragment>

    if(serverStatus !== null)
    {
        if(savedUnits.length > 0)
        {
            unitContent = savedUnits.map((unit) => {
                return <SavedUnit key={unit._id} unit={unit} />;
            })
        } else {
            unitContent = <Fragment>
                <div className='saved-no-units-caption'>There aren&apos;t any saved units.</div>
            </Fragment>
        }
    }


    return <>
        <nav className='navigation'>
            <div className='content-box content-box-navigation'>
                <div className='navigation-picture'>
                    <img src={bigExchangeIcon} alt='Exchange Icon' />
                </div>
                <div className='navigation-caption'>unit converter</div>
            </div>
        </nav>

        <main className='content-holder'>            
            <div className='content-box content-box-main'>
                <div className='convert-box'>
                    <div className='convert-box-title'>convert</div>
                    <div className='convert-box-input'>
                        <div className='convert-box-input-holder'>
                            <select key={currentUnit} defaultValue={currentUnit} onChange={ (event) => { updateSelectorUnit(event.target.value); } }>
                                <option value='km'>km → miles</option>
                                <option value='miles'>miles → km</option>
                                <option value='m'>m → feet</option>
                                <option value='feet'>feet → m</option>
                                <option value='cm'>cm → inches</option>
                                <option value='inches'>inches → cm</option>
                            </select>
                            <img src={exchangeIcon} alt='Alternate exchange icon' onClick={ () => { updateSelectorUnit(goalUnit); }} />
                        </div>
                        <div className='convert-box-input-holder'>
                            <input ref={inputRef} type='number' id='unit' onChange={ (event) => { calcResult(event.target.value, null) }}></input>
                            <label htmlFor='unit'>{currentUnit}</label>
                        </div>
                    </div>
                    <div className='convert-box-extra'>
                        <div className='convert-box-save'>
                            <img src={heartIcon} alt='Save unit' onClick={() => { appendCurrentUnit(); }} />
                        </div>
                        <div className='convert-box-result'>
                            <div className='convert-box-result-value'>{unitResult}</div>
                            <div className='convert-box-result-unit'>{goalUnit}</div>
                        </div>
                    </div>
                </div>

                <div className='saved-box'>
                    <div className='saved-box-caption'>saved</div>
                    <div className='saved-box-items'>
                        {unitContent}
                    </div>
                </div>
            </div>
        </main>

        <footer className='footer'>           
            <div className='content-box content-box-footer'>
                <div className='footer-item'>Terms of service</div>
                <div className='footer-item'>Privacy policy</div>
            </div>
        </footer>
    </>;

    function updateSelectorUnit(value)
    {
        let baseUnit = "", goalUnit = "";

        switch(value)
        {
            default:
            case 'km':
                baseUnit = "km";
                goalUnit = "miles";
                break;
            case 'miles':
                baseUnit = "miles";
                goalUnit = "km";
                break;
            case 'm':
                baseUnit = "m";
                goalUnit = "feet";
                break;
            case 'feet':
                baseUnit = "feet";
                goalUnit = "m";
                break;
            case 'cm':
                baseUnit = "cm";
                goalUnit = "inches";
                break;
            case 'inches':
                baseUnit = "inches";
                goalUnit = "cm";
                break;
        }

        dispatch(updateUnit(baseUnit));
        dispatch(updateGoalUnit(goalUnit));

        if(inputRef.current !== null && inputRef.current.value !== null && inputRef.current.value !== '')
        {
            calcResult(inputRef.current.value, baseUnit);            
        }
}

    function calcResult(value, updateUnit)
    {
        const mathValue = +(value);
        const usableUnit = (updateUnit === null) ? currentUnit : updateUnit;
        const result = calculateConversion(mathValue, usableUnit);

        const roundResult = Math.round((result + Number.EPSILON) * 100) / 100;
        dispatch(updateUnitResult(roundResult));
    }

    function calculateConversion(mathValue, unit)
    {
        switch(unit)
        {
            case 'km':
                return mathValue * 0.621371;
            case 'miles':
                return mathValue * 1.609344;
            case 'm':
                return mathValue * 3.2808;
            case 'feet':
                return mathValue * 0.3048;
            case 'cm':
                return mathValue * 0.393701;
            case 'inches':
                return mathValue * 2.54;
        }
    }

    function appendCurrentUnit() {
        if(inputRef.current !== null && inputRef.current.value !== null && inputRef.current.value !== '')
        {
            const inputValue = +(inputRef.current.value);
            
            if(serverStatus)
            {
                const unitContent = inputValue + currentUnit + ' → ' + unitResult + goalUnit;
                fetch("http://localhost:3000/unit/add", { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: "cors",
                    dataType: 'json',
                    body: JSON.stringify({content: unitContent}),
                })
                .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
                })
                .then((response) => {
                    console.log(response);
                    if(response.responseStatus)
                    {
                        if(response.responseStatus === 'validUnit')
                        {
                            const newUnit = response.unitResult;                            
                            inputRef.current.value = '';
                            dispatch(addUnit(newUnit));
                        } else {
                            // TODO: notify error
                        }
                    }            
                })
                .catch((error) => {
                    throw new Error(error);
                });
            } else {
                const newUnit = {
                    _id: getNextUnitId(),
                    content: inputValue + currentUnit + ' → ' + unitResult + goalUnit
                }
                inputRef.current.value = '';
                dispatch(addUnit(newUnit));
                appendUnit(newUnit);
            }
        }
    }
}

export default ContentComponent