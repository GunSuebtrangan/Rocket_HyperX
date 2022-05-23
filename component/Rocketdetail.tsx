import { gql, useQuery } from "@apollo/client";
interface objIdRocket {
  idRocket: string;
}
const Rocketdetail = (props: objIdRocket) => {
  // console.log(props.idRocket);
  const getRocketDetail = gql`
    query GetRocket {
      rocket(id: "${props.idRocket}") {
        name
        description
      }
    }
  `;
  const { loading, error, data } = useQuery(getRocketDetail);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  // console.log(data.rocket);
  return (
    <>
      <label>{}</label>
    </>
  );
};
export default Rocketdetail;
