import PropTypes from 'prop-types';
import '../style/savedUnit.css';
import crossIcon from '../assets/cross.png';

function SavedUnit({unit})
{
    return <>
        <div className='unit-item'>
            <div className='unit-item-content'>
                {unit.content}
            </div>
            <div className='unit-item-delete'>
                <img src={crossIcon} alt='Delete unit' />
            </div>
        </div>
    </>;
}

SavedUnit.propTypes = {
    unit: PropTypes.object
}

export default SavedUnit;