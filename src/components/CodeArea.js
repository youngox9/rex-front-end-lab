import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import _ from "lodash";

const Container = styled.div`
  width: 100%;
`;

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 12px;
  line-height: 1.5;
  /* overflow: scroll; */

  & .token-line {
    /* height: 1.3em; */
  }
`;

export default function CodeArea(props) {
  const { text = "", language = "js" } = props;
  return (
    <Container>
      <Highlight
        {...defaultProps}
        // theme={theme}
        code={text}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} key={key} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
    </Container>
  );
}
