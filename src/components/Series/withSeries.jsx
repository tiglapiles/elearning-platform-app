import React from "react";
import { getIdFromHref, pipe } from "../../services/utils";
import {
  getSeriesInfo,
  seriesSearch,
  getDocumentSeriesInfo,
} from "../../services/home";

const filterData = (name) => (data = []) => {
  const arr = [];
  data.map((o) => {
    if (o.source === name || name === "all") {
      arr.push(o);
    }
  });
  return arr;
};

const filterSearchData = (input) => (data) => {
  const arr = [];
  data.map((o) => {
    if (
      (o.data.file_name && o.data.file_name.includes(input)) ||
      (o.data.video_title && o.data.video_title.includes(input)) ||
      !input
    ) {
      arr.push(o);
    }
  });
  return arr;
};

const sd = (page) => (d) => d.slice((page - 1) * 12, page * 12);

function withSeries(WrapComponent, getSeriesData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        series: [],
        seriesLength: 0,
        seriesInfo: {},
        type: "all",
        input: "",
        isSearch: false,
        id: "",
      };
    }

    componentDidMount() {
      const { sid, dsid } = getIdFromHref();
      if (sid || dsid) {
        this.fetchSeriesData();
      } else {
        alert("系列不存在～");
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const { type, isSearch, input } = this.state;
      if (type !== prevState.type) {
        if (isSearch && input) {
          this.fetchSearchSeriesData();
        } else {
          this.fetchSeriesData();
        }
      }
      if (isSearch !== prevState.isSearch) {
        if (input && isSearch) {
          this.fetchSearchSeriesData();
        }
      }
    }

    setSeriesState = (page, data = {}) => {
      const { type, input } = this.state;
      this.setState({
        series: pipe(
          filterData(type),
          filterSearchData(input),
          sd(page)
        )(data.series),
        seriesLength: pipe(
          filterData(type),
          filterSearchData(input)
        )(data.series).length,
        seriesInfo: data.info,
        loading: false,
      });
    };

    fetchSeriesData = (page = 1) => {
      this.setState({ loading: true });
      getSeriesData(getIdFromHref()).then((data) => {
          console.log(data)
        this.setSeriesState(page, data);
      });
    };

    fetchSearchSeriesData = (page = 1) => {
      const { input, id, type } = this.state;
      this.setState({ loading: true });
      seriesSearch({
        query_string: input,
        series_id: id,
        type,
        max_size: 999,
        page,
      }).then((data) => {
        this.setState({
          series: sd(page)(data),
          seriesLength: data.length,
          loading: false,
        });
      });
    };

    handleTypeClick = (name) => {
      this.setState({ type: name });
    };

    handlePage = (event, page) => {
      if (this.state.isSearch) {
        this.fetchSearchSeriesData(page);
      } else {
        this.fetchSeriesData(page);
      }
    };

    handleSearchClick = () => {
      // 找到匹配名字的课件或视频
      this.setState({ isSearch: this.state.input ? true : false });
    };

    handleInput = (v) => {
      this.setState({ input: v });
    };

    render() {
      return (
        <WrapComponent
          {...this.state}
          {...this.props}
          handlePage={this.handlePage}
          handleTypeClick={this.handleTypeClick}
          handleSearchClick={this.handleSearchClick}
          handleInput={this.handleInput}
        />
      );
    }
  };
}

export default withSeries;
