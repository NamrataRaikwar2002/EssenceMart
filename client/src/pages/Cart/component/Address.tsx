// @ts-nocheck
import '../Cart.css'
import { useProduct } from '../../../hooks/context/productContext'
import { useNavigate } from 'react-router'
import { removeFromCart } from '../../../service/cartService/removeFromCart'
import { useAuth } from '../../../hooks/context/authContext'
import { toast } from 'react-toastify'

export const Address = ({ setSelectAddress, selectAddress }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const {
    userDetail: { token },
  } = useAuth()
  const {
    productState: { cart },
    productDispatch,
  } = useProduct()
  const totalPrice = cart.reduce(
    (total, item) => (total = (total + Number(item.prePrice)) * item.quantity),
    0,
  )
  const totalDiscount = (totalPrice * 45) / 100
  const finalAmount = parseInt(totalPrice - totalDiscount)
  const { firstName, email } = user

  const proceedPaymentHandler = async () => {
    const response = await loadSdk()
    if (response) {
      const options = {
        key: 'rzp_test_rdbCVpmoWnh6G3',
        key_id: 'rzp_test_rdbCVpmoWnh6G3',
        key_secret: 'vHlmGPxvW8yASRWWcle1cwQE',
        amount: finalAmount * 100,
        currency: 'INR',
        name: 'EssenceMart',
        description: 'Thank you for shopping.',
        image:
          'https://raw.githubusercontent.com/NamrataRaikwar2002/SkyMart/61e0a3008c6a5f097d7acfad327ec55d771a8404/src/assets/fevicon.ico',
        callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
        prefill: {
          name: firstName,
          email: email,
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#2563eb',
        },
        handler: (response) => {
          cart.map((item) => removeFromCart(item._id, token, productDispatch))
          navigate('/')
          toast.success('Congratualtion, order placed successfully!')
        },
      }

      const rzp1 = new window.Razorpay(options)
      rzp1.open()
      rzp1.on('Payment failed', () => {
      })
    } else {
      console.error('error')
    }
  }

  const loadSdk = async () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  return (
    <div className="addressDiv">
      <label htmlFor="addressInput" className="inputLable">
        <div className="addressCard">
          <input
            type="radio"
            id="addressInput"
            checked={selectAddress}
            onChange={(e) => setSelectAddress(e.target.checked)}
          />
          <div>
            <h1>{firstName}</h1>
            <p>H-23 north-west, main market, New delhi</p>
            <p>delhi,India</p>
            <p>Mobile:9838489893</p>
          </div>
        </div>
      </label>
      <button
        className={
          `${selectAddress}` === 'true'
            ? 'btn card_btn'
            : 'btn card_btn disableBtn'
        }
        onClick={proceedPaymentHandler}
      >
        Proceed
      </button>
    </div>
  )
}

