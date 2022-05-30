import { gql, useQuery } from "@apollo/client";
import { Table, Image, Spin } from "antd";
import { useState } from "react";
interface objLaunch {
  id: string;
  details: string;
  mission_name: string;
  links: { flickr_images: string };
  launch_year: string;
  launch_success: boolean;
}
interface Arr {
  key: string;
  images: any;
  mission_name: string;
  details: string;
  launch_year: string;
}
const Launch = () => {
  const [visible, setVisible] = useState(false);
  console.log(333);
  let arr: Array<Arr> = [];
  const getLaunchData = gql`
    query GetLaunch {
      launches {
        id
        details
        mission_name
        links {
          flickr_images
        }
        launch_year
        launch_success
      }
    }
  `;
  const { loading, error, data } = useQuery(getLaunchData);
  if (loading) return <Spin />;
  if (error) return `Error! ${error.message}`;
  if (data) {
    // console.log(data);
    data.launches.map((value: objLaunch) => {
      arr.push({
        key: value.id,
        images: value.links.flickr_images,
        mission_name: value.mission_name,
        details: value.details,
        launch_year: value.launch_year,
      });
    });
    console.log("arr", arr);
  }
  return (
    <Table
      columns={[
        { title: "Mission Name", dataIndex: "mission_name" },
        { title: "Details", dataIndex: "details" },
        { title: "Launch year", dataIndex: "launch_year" },
        {
          title: "Picture",
          dataIndex: "images",
          // render: (_, { images }) => (
          //   <>
          //     <Image src={images} width={100} />
          //   </>
          // ),
          render: (_, { images }) => (
            <>
              <Image
                key={images[0]}
                src={images[0]}
                width={100}
                preview={{
                  visible: false,
                }}
                onClick={() => setVisible(true)}
              />
              <div
                style={{
                  display: "none",
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  {images.map((value: any) => {
                    return <Image src={value} key={value} />;
                  })}
                </Image.PreviewGroup>
              </div>
            </>
          ),
        },
      ]}
      pagination={{ pageSize: 3 }}
      dataSource={arr}
    />
  );
};
export default Launch;
