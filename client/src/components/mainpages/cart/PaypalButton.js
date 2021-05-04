import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default class PaypalButton extends React.Component {
  render() {
    let style = {
      size: "small",
      color: "blue",
      shape: "rect",
      label: "checkout",
      tagline: false,
    };
    let env = "sandbox";
    let currency = "USD";
    let total = this.props.total;
    return (
      <PayPalButton
        style={style}
        amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data, payment) => {
          alert("Transaction completed by " + details.payer.name.given_name);
          this.props.transSuccess(payment);
          // OPTIONAL: Call your server to save the transaction

          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.orderID,
            }),
          });
        }}
        options={{
          clientId:
            "AVZvttZ6VWKytAKLmlVo6t_A4whNljZxP6w29zhLWzqlKM8_YfbGrfmNQY_90hA4CAHlTpwSsYXcw7f4",
          disableFunding: "credit,card",
        }}
      />
    );
  }
}

// import { PayPalButton } from "react-paypal-button-v2";

// export default class PaypalButton extends React.Component {
//   render() {
//     return (
//       <PayPalButton
//         amount="0.01"
//         // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
//         onSuccess={(details, data) => {
//           alert("Transaction completed by " + details.payer.name.given_name);

//           // OPTIONAL: Call your server to save the transaction
//           return fetch("/paypal-transaction-complete", {
//             method: "post",
//             body: JSON.stringify({
//               orderID: data.orderID,
//             }),
//           });
//         }}
//       />
//     );
//   }
// }
