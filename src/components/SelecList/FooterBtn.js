import React, { useContext, memo } from "react";
import {
  PageDispatchContext,
  ImagesDispatchContext,
} from "contexts/ImageList.context";
import useStyle from "./style";
import { Grid, Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const ShowAnswerBtn = styled(Button)({
  userSelect: "none",
  padding: "2px 16px",
  width: "100%",
});

function FooterBtn({
  isSubmited,
  isAnswered,
  isCorrect,
  currentPageNum,
  imageList,
}) {
  const pageDispatch = useContext(PageDispatchContext);
  const imageListsDispatch = useContext(ImagesDispatchContext);
  const classes = useStyle();
  const showFace = () => {
    imageListsDispatch({
      type: "SHOWFACE",
      currentPageNum: currentPageNum,
    });
  };
  const hideFace = () => {
    imageListsDispatch({
      type: "HIDEFACE",
      currentPageNum: currentPageNum,
    });
  };
  const mouseDown = (e) => {
    document.body.classList.add("non-select");
    e.preventDefault();
    showFace();
  };
  const touchStart = (e) => {
    document.body.classList.add("non-select");
    showFace();
    e.preventDefault();
  };
  const touchEnd = (e) => {
    document.body.classList.remove("non-select");
    hideFace();
    e.preventDefault();
  };
  const mouseUp = (e) => {
    document.body.classList.remove("non-select");
    e.preventDefault();
    hideFace();
  };
  return (
    <div className={classes.footer}>
      {/* <div className={classes.divid}></div> */}
      <Grid container spacing={1} className={classes.controls}>
        {!isSubmited ? (
          <Grid item xs={12}>
            <ShowAnswerBtn
              variant="contained"
              disableElevation
              fullWidth
              color="primary"
              disabled={!isAnswered && true}
              onClick={() => {
                pageDispatch({
                  type: "SUBMIT",
                  // currentPage: pageState.currentPageNum,
                  imageList: imageList,
                });
              }}
            >
              I am not A ROBOT
            </ShowAnswerBtn>
          </Grid>
        ) : !isCorrect ? (
          <React.Fragment>
            <Grid item xs={6}>
              <ShowAnswerBtn
                variant="outlined"
                color="primary"
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
                // onClick={() => {
                //   // imageListsDispatch({
                //   //   type: "SHOWRIGHTANSWERIMAGE",
                //   //   currentPageNum: currentPageNum,
                //   //   // result: listResult,
                //   // });
                // }}
              >
                Show Answer
              </ShowAnswerBtn>
            </Grid>
            <Grid item xs={6}>
              <ShowAnswerBtn
                variant="contained"
                disableElevation
                // fullWidth
                color="primary"
                onClick={() => {
                  pageDispatch({
                    type: "NEXTPAGE",
                  });
                }}
              >
                Next
              </ShowAnswerBtn>
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid item xs={12}>
              <ShowAnswerBtn
                variant="contained"
                disableElevation
                // fullWidth
                color="primary"
                onClick={() => {
                  pageDispatch({
                    type: "NEXTPAGE",
                    // currentPage: pageState.currentPageNum,
                  });
                }}
              >
                Next
              </ShowAnswerBtn>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </div>
  );
}

export default memo(FooterBtn);
