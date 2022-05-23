import { gql, useQuery } from "@apollo/client";
import { Space, Table, Tag, Spin } from "antd";
import { ColumnsType } from "antd/lib/table";
interface objIdRocket {
  idRocket?: string;
}

const Rocketdetail = (props: objIdRocket) => {
  // console.log(props.idRocket);
  let column: any = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Height", dataIndex: "height", key: "height" },
    ,
    { title: "Weight", dataIndex: "weight", key: "weight" },
    { title: "Company", dataIndex: "company", key: "company" },
  ];
  let dataRocketDetail: any = [];
  const getRocketDetail = gql`
    query GetRocket {
      rocket(id: "${props.idRocket}") {
        id
        name
        description
        height {
          feet
          meters
        }
        company      
        mass {
          kg
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(getRocketDetail);
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;
  if (data.rocket) {
    dataRocketDetail = [
      {
        key: data.rocket.id,
        name: data.rocket.name,
        description: data.rocket.description,
        height: data.rocket.height.meters,
        weight: data.rocket.mass.kg,
        company: data.rocket.company,
      },
    ];
    console.log(data);
  }
  // console.log("data", data);
  return (
    <>
      {/* <label>{data.rocket ? data.rocket.description : ""}</label> */}
      {data.rocket ? (
        <Table
          columns={column}
          dataSource={dataRocketDetail}
          onChange={() => {
            console.log(6666);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Rocketdetail;
