import { gql, useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { Table, Image, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
interface Objships {
  name: string;
  image: string;
}
const Ships = () => {
  let offset = 0;
  let lim = 2;
  let setPrev = [];
  const [Picture, setPicture] = useState<Array<Objships>>([]);

  const handleScroll = (event: any) => {
    if (
      event.target.documentElement.scrollTop + window.innerHeight + 1 >=
        event.target.documentElement.scrollHeight &&
      !loading
    ) {
      offset = offset + 2;
      fetchMore({
        variables: { off: offset, lim: 2 },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log("fetch", fetchMoreResult);
          setPicture((prev: Array<Objships>) => {
            return [...prev, ...fetchMoreResult.ships];
          });
        },
      });
    }
  };
  useEffect(() => {
    addShip({ variables: { off: offset, lim: lim } });
    window.addEventListener("scroll", handleScroll);
  }, []);

  const getShipshData = gql`
    query GetLaunch($off: Int!, $lim: Int!) {
      ships(offset: $off, limit: $lim) {
        name
        image
      }
    }
  `;
  const [addShip, { loading, error, data, fetchMore }] = useLazyQuery(
    getShipshData,
    {
      notifyOnNetworkStatusChange: true,
      onCompleted: (value) => {
        setPicture(value.ships);
      },
    }
  );
  // const getShipshData = gql`
  //   query GetLaunch {
  //     ships {
  //       image
  //     }
  //   }
  // `;
  console.log("load", loading);
  // const { loading, error, data } = useQuery(getShipshData, {
  //   onCompleted: (data) => {
  //     setPicture(data.ships);
  //     console.log("picture", Picture.length);
  //   },
  // });

  // if (data) {
  //   console.log(data);
  // }
  //   Picture.map((value) => {
  //     console.log("test", value.image);
  //   });
  return (
    <>
      {Picture.length !== 0 ? (
        Picture.map((value: Objships, index) => {
          return (
            <div key={index}>
              <Image src={value.image} />
              <label>{value.name}</label>
            </div>
          );
        })
      ) : (
        <Spin />
      )}
      {loading ? <Spin style={{ margin: "40px" }} /> : ""}
      {/* <button
        onClick={() => {
          offset = offset + 2;
          console.log("offset", offset);
          fetchMore({
            variables: { off: offset, lim: 2 },
            updateQuery: (prev, { fetchMoreResult }) => {
              console.log("prev", prev);
              // setPicture([...Picture, ...fetchMoreResult.ships]);
              setPicture((prev: any) => {
                return [...prev, ...fetchMoreResult.ships];
              });
              // console.log("fecth", fetchMoreResult.ships);
              // console.log("merge", [...prev.ships, ...fetchMoreResult.ships]);
              // return (setPrev = [...prev, ...fetchMoreResult]);

              // setPicture([...prev.ships, ...fetchMoreResult.ships]);
            },
          });
        }}
      >
        test
      </button> */}
    </>
  );
};
export default Ships;
