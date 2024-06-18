import './content.css';
import bigExchangeIcon from './assets/exchange-big.png';
import exchangeIcon from './assets/exchange.png';
import heartIcon from './assets/heart.png';

function ContentComponent()
{
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
                        <select defaultValue={'km'}>
                            <option value='km'>km → miles</option>
                            <option value='miles'>km → miles</option>
                            <option value='m'>m → feet</option>
                            <option value='feet'>feet → m</option>
                            <option value='cm'>cm → inches</option>
                            <option value='inch'>inches → cm</option>
                        </select>
                        <img src={exchangeIcon} alt='Alternate exchange icon' />
                        <input type='number' id='unit'></input>
                        <label htmlFor='unit'>km</label>
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