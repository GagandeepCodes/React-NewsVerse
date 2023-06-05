import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {

  static defaultProps =  {
    country : "in",
    pageSize : 6,
    category : "general"
  }

  static propTypes = {
    country : PropTypes.string,
    page :  PropTypes.number,
    category : PropTypes.string
  }
    constructor(){
        super();
        console.log("I am a constructor");
        this.state= {
            articles :[],
            loading: false,
            page : 1
        }
    }


    //Instead of having same code repeated in next and prev, have a different section for updating the news.
    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e322df409c243fa911cb89f735b147f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      //Now we are going to use fetch API
      //We will be using async await
      this.setState({loading : true});
      let data = await fetch(url);
      // console.log(typeof(data));
      let parsedData = await data.json();
      // console.log(typeof(parsedData));
      console.log(parsedData);
      this.setState({
        articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading:false
      })
    }
    //In class based components componentDidMount is used for fetching the data
    //componentDidMount runs after the render function
    async componentDidMount(){
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e322df409c243fa911cb89f735b147f&page=1&pageSize=${this.props.pageSize}`;
      // //Now we are going to use fetch API
      // //We will be using async await
      // this.setState({loading : true});
      // let data = await fetch(url);
      // // console.log(typeof(data));
      // let parsedData = await data.json();
      // // console.log(typeof(parsedData));
      // console.log(parsedData);
      // this.setState({
      //   articles : parsedData.articles,
      //   totalResults : parsedData.totalResults,
      //   loading:false
      // })
      this.updateNews();
    }

     handleNextClick = async ()=> {
          // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e322df409c243fa911cb89f735b147f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
          // //Now we are going to use fetch API
          // //We will be using async await
          // this.setState({loading : true});
          // let data = await fetch(url);
          // // console.log(typeof(data));
          // let parsedData = await data.json();
          // // console.log(typeof(parsedData));
          // console.log(parsedData);

          // this.setState({
          //   page : this.state.page + 1,
          //   articles : parsedData.articles,
          //   loading : false
          // })
          await this.setState({
            page : this.state.page + 1
          });
          this.updateNews();
    }
    handlePrevClick = async ()=> {

      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4e322df409c243fa911cb89f735b147f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      // //Now we are going to use fetch API
      // //We will be using async await
      // //We will set the loading as true,when it will try to fetch  the data
      // this.setState({loading : true});
      // let data = await fetch(url);
      // // console.log(typeof(data));
      // let parsedData = await data.json();
      // // console.log(typeof(parsedData));
      // console.log(parsedData);
      // //loading will be set as false in the setState, when data has been parsed
      // this.setState({
      //   page : this.state.page - 1,
      //   articles : parsedData.articles,
      //   loading:false
      // })
      await this.setState({
        page : this.state.page - 1
      });
      this.updateNews();
    }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsVerse - Top headlines</h2>
       {this.state.loading && <Spinner/>}
        <div className="row my-3">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,88):""} imageUrl ={element.urlToImage} newsUrl = {element.url} Author = {element.author?element.author:"Unknown"} date = {element.publishedAt?element.publishedAt:"Unknown"} source = {element.source.name?element.source.name:"Unknown"}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled = {this.state.page<=1} className="btn btn-dark"  onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        </div>
      </div>
    )
  }
}
 
export default News