import React, { Component } from "react";
import styled from "styled-components";

export default class TwoCol extends Component {
  renderLeft() {
    const props = this.props;
    if (props.left === "imageCover") {
      const Column = styled.div`
        background-image: url(${props.leftContent});
        background-size: cover;
        height: ${this.props.height};
        width: 50%;
        background-position: center;
      `;
      return <Column />;
    } else if (props.left === "image") {
      const Column = styled.div`
        width: 50%;
        img {
          width: 100%;
        }
      `;
      return (
        <Column>
          <img src={props.leftContent} alt={props.leftAlt} />
        </Column>
      );
    } else if (props.left === "text") {
      const Column = styled.div`
        width: 50%;
        div {
          padding: 50px;
        }
      `;
      return (
        <Column>
          <div dangerouslySetInnerHTML={{ __html: props.leftContent }} />
        </Column>
      );
    }
  }
  renderRight() {
    const props = this.props;
    if (props.right === "imageCover") {
      const Column = styled.div`
        background-image: url(${props.rightContent});
        background-size: cover;
        height: ${this.props.height};
        width: 50%;
        background-position: center;
      `;
      return <Column />;
    } else if (props.right === "image") {
      const Column = styled.div`
        width: 50%;
        img {
          width: 100%;
        }
      `;
      return (
        <Column>
          <img src={props.rightContent} alt={props.rightAlt} />
        </Column>
      );
    } else if (props.right === "text") {
      const Column = styled.div`
        width: 50%;
        div {
          padding: 50px;
        }
      `;
      return (
        <Column>
          <div dangerouslySetInnerHTML={{ __html: props.rightContent }} />
        </Column>
      );
    }
  }
  render() {
    let containerWidth = "100%";
    if (this.props.type === "container") {
      containerWidth = "90%";
    }

    const Columns = styled.div`
      align-items: ${this.props.alignItems}
      display: flex;
      flex-wrap: wrap;
      width: ${containerWidth};
      margin: 0 auto;
    `;

    return (
      <Columns>
        {this.renderLeft()}
        {this.renderRight()}
      </Columns>
    );
  }
}