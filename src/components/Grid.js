import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import Editor from "./Editor";

export default class Grid extends Component {
  renderOverlayText = content => {
    const props = this.props;
    if (props.textType === "overlay") {
      return (
        <div className="title" dangerouslySetInnerHTML={{ __html: content }} />
      );
    }
  };

  renderMarkup = content => {
    return { __html: content };
  };

  renderUnderText = content => {
    const props = this.props;
    if (props.textType === "under") {
      return (
        <div
          className="under-text"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
  };
  renderGrid() {
    const props = this.props;
    if (props.data) {
      return _.map(props.data, grid => {
        const Grid = styled.div`
          .grid-image {
            background-image: url('${grid.image}');
            background-size: cover;
            height: ${this.props.height};
          }
          .icon-image,
          .grid-image {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: ${this.props.align};
          }
          .icon-image {
            img {
              width: auto;
              padding: ${this.props.imagePadding};
              max-height: ${this.props.imageHeight};
            }
          }
          .under-text {
            padding: 15px 0 30px;
          }
          .title {
            color: white;
            position: relative;
            z-index: 1;
          }
        `;

        const Overlay = styled.div`
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 0;
        `;
        if (this.props.type === "cover") {
          return (
            <Grid>
              <div className="grid-image">
                {this.renderOverlayText(grid.content)}

                {props.overlay && <Overlay />}
              </div>
              {this.renderUnderText(grid.content)}
            </Grid>
          );
        }
        if (this.props.type === "icon") {
          return (
            <Grid>
              <div className="icon-image">
                {grid.image && <img src={grid.image} alt="Grid Image" />}
                {this.renderOverlayText(grid.content)}
              </div>
              <h3>{grid.title}</h3>
              <p dangerouslySetInnerHTML={this.renderMarkup(grid.content)} />
              <a className="grid-button" href={grid.link}>
                {grid.linkTitle}
              </a>
            </Grid>
          );
        }
        if (this.props.type === "text") {
          return (
            <Grid>
              <div
                className="grid-content"
                dangerouslySetInnerHTML={{ __html: grid.content }}
              />
            </Grid>
          );
        }
      });
    }
  }

  renderContent() {
    const props = this.props,
      gridTotal = Object.keys(props.data).length,
      Container = styled.div`
        padding: ${props.padding} 0px;
        ${this.props.fullWidth ? "width: 100%" : "width: 90%; margin: 0 auto"};
        h2 {
          padding: 40px;
          text-align: ${props.textAlign};
        }
      `,
      Wrapper = styled.div`
        ${props.containerStyles}
        display: grid;
        position: relative;
        max-width: ${props.maxWidth};
        ${props.maxWidth && "margin: 0 auto;"}
        grid-template-columns: repeat(${props.mobileColumns}, 1fr);
        grid-gap: ${props.gridGap};
        @media screen and (min-width: 768px) {
          grid-template-columns: repeat(${props.tabletColumns}, 1fr);
        }
        @media screen and (min-width: 1024px) {
          grid-template-columns: repeat(${props.columns}, 1fr);
        }
      `;
    if (props) {
      return (
        <Container>
          {props.title && <h2 style={{ width: "100%" }}>{this.props.title}</h2>}
          <Wrapper>
            {this.props.editor && (
              <Editor
                blockUp={this.props.blockUp}
                blockDown={this.props.blockDown}
                id={this.props.id}
                deleteBlock={this.props.deleteBlock}
                enableIcon={this.props.enableIcon}
              />
            )}
            {this.renderGrid()}
          </Wrapper>
        </Container>
      );
    }
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
