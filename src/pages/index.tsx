import HomeBanner from "@/components/home/HomeBanner";
import HomePangination from "@/components/home/HomePangination";
import HomeProductsShow from "@/components/home/HomeProductsShow";
import ProductFilters from "@/components/productFilters";
import RenderLoader from "@/components/loader/RenderLoader";
import AppLayout from "@/layouts/AppLayout";
import {useSession} from 'next-auth/react'
import {
  HomeProductsReq,
  HomeProductsSuccess,
  HomeProductsFail,
} from "@/redux/slices/homeSlice";
import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userFail, userReq, userSuccess } from "@/redux/slices/userSlice";

type Props = {};

const index = (props: Props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [filterVal, setFilterVal] = useState("all");

  const {data:session} = useSession()

  const dispatch = useAppDispatch();

  const { totalPages, loading, products } = useAppSelector(
    (state) => state.homeProducts
  );

  const getUser = async (uid: string) => {
    try {
      dispatch(userReq());

      const { data } = await axios.get(
        `${process.env.BACKEND_API_URL}/users/${uid}`
      );

      if (data) {
        dispatch(userSuccess({ data }));
      }
    } catch (error) {
      dispatch(userFail({ error }));
    }
  };

  const getHomeProducts = async (pageNumber: number) => {
    try {
      dispatch(HomeProductsReq());

      const { data } = await axios.get(
        `${process.env.BACKEND_API_URL}/products?page=${pageNumber}`
      );
      dispatch(
        HomeProductsSuccess({
          products: data.Products,
          totalPages: data.totalPages,
        })
      );
    } catch (error) {
      dispatch(HomeProductsFail({ error }));
    }
  };

  const getHomeProductsWithCategory = async (filterVal: string) => {
    try {
      dispatch(HomeProductsReq());

      const { data } = await axios.get(
        `${process.env.BACKEND_API_URL}/products?page=${pageNumber}&category=${filterVal}`
      );
      dispatch(
        HomeProductsSuccess({
          products: data.Products,
          totalPages: data.totalPages,
        })
      );
    } catch (error) {
      dispatch(HomeProductsFail({ error }));
    }
  };


  useEffect(() => {
    if (typeof session?.user.id === "string") {
      console.log(session?.user.id);
      getUser(session?.user.id)
    }
  }, [session]);

  useEffect(() => {
    if (filterVal === "all") {
      getHomeProducts(pageNumber);
    } else {
      getHomeProductsWithCategory(filterVal);
    }

    window && window.scrollTo(0, 0);
  }, [dispatch, pageNumber, filterVal]);

  if (loading) {
    return <RenderLoader width={"100vw"} height={"90vh"} />;
  }

  return (
    <>
      {products && (
        <>
          <ProductFilters filterVal={filterVal} setFilterVal={setFilterVal} />

          <HomeProductsShow />

          {totalPages && (
            <HomePangination
              totalPages={totalPages}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}

          <HomeBanner />
        </>
      )}
    </>
  );
};

export default index;

index.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
