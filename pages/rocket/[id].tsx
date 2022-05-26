import { gql, useQuery } from "@apollo/client";
import { Table, Tag, Spin } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
// import { nameState } from "../../states/dataTestRecoil";
interface objIdRocket {
  idRocket?: string;
}

interface gqlDataRockets {
  key: string;
  name: string;
  height: number;
  weight: number;
  company: string;
  wikipedia: string;
  engine_loss_max: number;
  engine_layout: string;
  engine_number: number;
  description: string;
  active: boolean;
}
const Rocketdetail = (props: objIdRocket) => {
  const router = useRouter();
  const { id } = router.query;
  let dataRocketDetail: gqlDataRockets[] = [];
  // let column: any = [];
  const getRocketDetail = gql`
    query GetRocket {
      rocket(id: "${id}") {
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
    dataRocketDetail = [
      {
        key: data.rocket.id,
        name: data.rocket.name,
        description: data.rocket.description,
        height: data.rocket.height.meters,
        weight: data.rocket.mass.kg,
        company: data.rocket.company,
        wikipedia: data.rocket.wikipedia,
        active: data.rocket.active,
        engine_loss_max: data.rocket.engines.engine_loss_max,
        engine_number: data.rocket.engines.number,
        engine_layout: data.rocket.engines.layout,
      },
    ];
    console.log("type", typeof dataRocketDetail);
  }
  return (
    <>
      {data.rocket ? (
        <Table
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",
            },
            { title: "Height", dataIndex: "height", key: "height" },
            { title: "Weight", dataIndex: "weight", key: "weight" },
            { title: "Company", dataIndex: "company", key: "company" },
            {
              title: "Active",
              dataIndex: "active",
              key: "active",
              render: (_, { active }: any) => (
                <>
                  {active ? (
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
          ]}
          expandable={{
            expandedRowRender: (rec) => {
              return (
                <Table
                  columns={[
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
                  ]}
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
