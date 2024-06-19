import PropTypes from 'prop-types';
import '../style/savedUnit.css';
import crossIcon from '../assets/cross.png';
import { useDispatch } from 'react-redux';
import { removeUnit } from '../scripts/redux/unitActions';
import { deleteUnit } from '../scripts/data/dataManager';

function SavedUnit({unit})
{
    const dispatch = useDispatch();
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
        dispatch(removeUnit(unit._id));
        deleteUnit(unit);
    }
}

SavedUnit.propTypes = {
    unit: PropTypes.object
}

export default SavedUnit;