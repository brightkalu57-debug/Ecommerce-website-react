import './reset.css';
import axios from 'axios';
export function Reset({ LoadCart }) {
  return (
    <button
      className="resetbttn"
      onClick={async () => {
        await axios.post('http://localhost:3000/api/reset');
        await LoadCart();
      }}
    >
      <img src="images/trash-icon-removebg.png" />
      Reset
    </button>
  );
}
