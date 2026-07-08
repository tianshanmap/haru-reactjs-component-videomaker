import { useNavigate } from 'react-router-dom';
function Header(){
  const navigate = useNavigate();
    return(
        <div className="header">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/videomaker")}>Video Creator</button>
        </div>
    )
}
export default Header