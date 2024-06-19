import PropTypes from 'prop-types';
import '../style/savedUnit.css';
import crossIcon from '../assets/cross.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeUnit } from '../scripts/redux/unitActions';
import { deleteUnit } from '../scripts/data/dataManager';

function SavedUnit({unit})
{
    const dispatch = useDispatch();
    const serverStatus = useSelector(state => state.unit.serverConnected);

    return <>
        <div className='unit-item'>
            <div className='unit-item-content'>
                {unit.content}
            </div>
            <div className='unit-item-delete'>
                <img src={crossIcon} alt='Delete unit' onClick={ () => { attemptDeletion(unit); }} />
            </div>
        </div>
    </>;
    
    function attemptDeletion(unit)
    {
        if(serverStatus)
        {
            const requestObject = {
                unit_id: unit._id
            }
            fetch("https://oxygen-app-fc0b4cf85cf7.herokuapp.com/unit/delete", { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                dataType: 'json',
                body: JSON.stringify(requestObject),
            })
            .then((response) => {
            if (response.status >= 400) {
                throw new Error("server error");
            }
            return response.json();
            })
            .then((response) => {
                if(response.responseStatus)
                {
                    if(response.responseStatus === 'unitDeleted')
                    {                        
                        dispatch(removeUnit(unit._id));
                    } else {
                        // TODO: notify error
                    }
                }            
            })
            .catch((error) => {
                throw new Error(error);
            });
        } else {
            dispatch(removeUnit(unit._id));
            deleteUnit(unit);
        }
    }
}

SavedUnit.propTypes = {
    unit: PropTypes.object
}

export default SavedUnit;