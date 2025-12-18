import CheckoutStepper from "../Components/CheckoutStepper/CheckoutStepper";
import DeliveryMethod from "../Components/PaymentPage/DeliveryMethod/DeliveryMethod";
import PaymentForm from "../Components/PaymentPage/PaymentForm/PaymentForm";
import PaymentMethod from "../Components/PaymentPage/PaymentMethod/PaymentMethod";

import "../Styles/payment.sass"

export default function Payment() {
  return (
    <div className="payment-page">
      <CheckoutStepper />

      <div className="payment-page__content">
        <div className="payment-page__left">
          <div className="payment-page__form-title">
            <h3>Your info</h3>
            <PaymentForm />
          </div>

          <div className="payment-page__delivery-title">
            <h3>Select your prefered delivery method</h3>
            <DeliveryMethod />
          </div>

          <div className="payment-page__payment-method-title">
            <h3>Choose payment method</h3>
            <PaymentMethod />
          </div>
        </div>

        <div className="payment-page__right">
          <h2>Order Summary</h2>
          
        </div>
      </div>
    </div>
  )
}
