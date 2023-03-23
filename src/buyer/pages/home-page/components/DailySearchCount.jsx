import React, { useState } from "react";
import { useTheme } from "styled-components";

import { SparklesIcon } from "@buyer/assets/icons";
import { useSearch } from "../store/SearchProvider";

const DailySearchCount = () => {
  const theme = useTheme();
  const [searchCount] = useState(100 + Math.floor(Math.random() * 2000));
  const { searchMode } = useSearch();

  if (searchMode) return null;
  return (
    <p
      style={{
        color: theme.text.light,
        fontSize: theme.fontSizes[1],
        marginTop: theme.space[7],
      }}
    >
      <SparklesIcon width="16px" className="inline text-primary mr-1" />
      <span
        style={{
          fontWeight: theme.fontWeights.bold,
          marginRight: theme.space[2],
        }}
      >
        {searchCount}
      </span>
      searches made today!
    </p>
  );
};

export default DailySearchCount;
