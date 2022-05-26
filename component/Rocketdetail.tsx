import { gql, useQuery } from "@apollo/client";
import { Table, Tag, Spin } from "antd";
import { ColumnsType } from "antd/lib/table";
interface objIdRocket {
  idRocket?: string;
}

const Rocketdetail: any = (props: objIdRocket) => {
  // console.log(props.idRocket);

  let dataRocketDetail: any = [];
  let column: any = [];
  let subColumn: any = [];
  const getRocketDetail = gql`
    query GetRocket {
      rocket(id: "${props.idRocket}") {
        id
        name
        description
        active
        height {
          feet
          meters
        }
        engines {
          engine_loss_max
          number
          layout
        
        }
        company      
        mass {
          kg
        }
        wikipedia
      }
    }
  `;
  const { loading, error, data } = useQuery(getRocketDetail);
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;
  if (data.rocket) {
    column = [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Description", dataIndex: "description", key: "description" },
      { title: "Height", dataIndex: "height", key: "height" },
      ,
      { title: "Weight", dataIndex: "weight", key: "weight" },
      { title: "Company", dataIndex: "company", key: "company" },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        render: (_: any, { tags }: any) => (
          <>
            {tags ? (
              <Tag color={"green"}>Yes</Tag>
            ) : (
              <Tag color={"volcano"}>No</Tag>
            )}
          </>
        ),
      },
      {
        title: "Wiki",
        dataIndex: "wikipedia",
        key: "wikipedia",
        render: (text: string) => <a href={text}>Link</a>,
      },
    ];
    subColumn = [
      {
        title: "Engine_loss_max",
        dataIndex: "engine_loss_max",
        key: "engine_loss_max",
      },
      {
        title: "Engine_number",
        dataIndex: "engine_number",
        key: "engine_number",
      },
      {
        title: "Engine_layout",
        dataIndex: "engine_layout",
        key: "engine_layout",
      },
    ];
    dataRocketDetail = [
      {
        key: data.rocket.id,
        name: data.rocket.name,
        description: data.rocket.description,
        height: data.rocket.height.meters,
        weight: data.rocket.mass.kg,
        company: data.rocket.company,
        wikipedia: data.rocket.wikipedia,
        tags: data.rocket.active,
        engine_loss_max: data.rocket.engines.engine_loss_max,
        engine_number: data.rocket.engines.number,
        engine_layout: data.rocket.engines.layout,
      },
    ];
    // console.log("detail", data);
  }
  // console.log("data", data);
  return (
    <>
      {/* <label>{data.rocket ? data.rocket.description : ""}</label> */}
      {data.rocket ? (
        <Table
          columns={column}
          expandable={{
            expandedRowRender: (rec) => {
              return (
                <Table
                  columns={subColumn}
                  dataSource={dataRocketDetail}
                  pagination={false}
                />
              );
            },
          }}
          dataSource={dataRocketDetail}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Rocketdetail;
