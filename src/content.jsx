import './content.css';
import bigExchangeIcon from './assets/exchange-big.png';
import exchangeIcon from './assets/exchange.png';
import heartIcon from './assets/heart.png';
import SavedUnit from './components/savedUnit';

function ContentComponent()
{
    const mockUnit = {
        _id: 0,
        content: '100 miles → 160 km'
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
                            <select defaultValue={'km'}>
                                <option value='km'>km → miles</option>
                                <option value='miles'>km → miles</option>
                                <option value='m'>m → feet</option>
                                <option value='feet'>feet → m</option>
                                <option value='cm'>cm → inches</option>
                                <option value='inch'>inches → cm</option>
                            </select>
                            <img src={exchangeIcon} alt='Alternate exchange icon' />
                        </div>
                        <div className='convert-box-input-holder'>
                            <input type='number' id='unit'></input>
                            <label htmlFor='unit'>km</label>
                        </div>
                    </div>
                    <div className='convert-box-extra'>
                        <div className='convert-box-save'>
                            <img src={heartIcon} alt='Save unit' />
                        </div>
                        <div className='convert-box-result'>
                            <div className='convert-box-result-value'>62.12</div>
                            <div className='convert-box-result-unit'>miles</div>
                        </div>
                    </div>
                </div>

                <div className='saved-box'>
                    <div className='saved-box-caption'>saved</div>
                    <div className='saved-box-items'>
                        <SavedUnit key={mockUnit._id} unit={mockUnit} />
                        <SavedUnit key={mockUnit._id} unit={mockUnit} />
                        <SavedUnit key={mockUnit._id} unit={mockUnit} />
                        <SavedUnit key={mockUnit._id} unit={mockUnit} />
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
    </>
}

export default ContentComponent