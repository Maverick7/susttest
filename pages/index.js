import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getSchema } from "../redux/main/schema/schema.actions";
import { useRouter } from "next/router";
import MainPage from "../components/layout/main";
import Navbar from "../components/common/Navbar";
import RegCard from "../components/ui/registerCard";
import { useLocation } from "react-router-dom";
import { useGetFormQuery } from "../redux/services/events";


const SignUp = ({ id, fetchSchema }) => {
  useEffect(() => {
    console.log("fetching..");
    if (id) {
      fetchSchema(id);
    }
  }, [id]);
  return (
    <Fragment>
        <Navbar />

      <MainPage>
        {id !== null ? <RegCard eventId={id} /> : <h1>default registerCard</h1>}
      </MainPage>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSchema: (id) => dispatch(getSchema(id)),
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
