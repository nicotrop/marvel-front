import { useParams } from "react-router-dom";

const Character = () => {
  const { characterid } = useParams();

  return (
    <div>
      <h1>{characterid}</h1>
    </div>
  );
};

export default Character;
