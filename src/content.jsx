import './content.css';
import bigExchangeIcon from './assets/exchange-big.png';

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
            <div className='content-box'>
                <div className='convert-box'>
                    <div className='convert-box-title'>convert</div>
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