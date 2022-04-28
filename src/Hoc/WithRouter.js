import React from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";

function withRouter(Element) {
  return function children(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Element
        {...props}
        params={params}
        navigate={navigate}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    );
  };
}

export default withRouter;
