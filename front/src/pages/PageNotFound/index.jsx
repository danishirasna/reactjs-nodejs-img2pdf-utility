import { React } from "react";
import { RecordNotFound } from 'components';
import PageNotFoundIMG from './../../../src/assets/404.png';

function PageNotFound() {
  return (
    <div className="unauth_content_main">
      <div className="unauth_content_inner">
        <div className="container text-center">
          <RecordNotFound img={PageNotFoundIMG} error="Sorry, No Page Found" maxWidth="100px" />
        </div>
      </div>
    </div>
  );
};
export default PageNotFound;
