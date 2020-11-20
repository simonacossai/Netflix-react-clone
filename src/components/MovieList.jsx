
import React from 'react';
import { Container, Row, FormControl } from "react-bootstrap";
import SingleMovie from './SingleMovie';
import './MovieList.css';


class MovieList extends React.Component {
    state = {
      titles:["batman", "superman", "titanic", "Harry Potter"],
      movies:[],
      filtered:[],
      array: [],
      input:""
    }

    fetchMovies = async (titles) => {
      try {
        const response = await fetch("http://www.omdbapi.com/?apikey=ada5e6d6&s="+ titles,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          this.state.array.push(...data.Search);
          console.log(this.state.array);
          this.setState({ movies: this.state.array, filtered:this.state.array });
          console.log("state", this.state.movies);
        }
      } catch (e) {
        console.log(e);
      }
    };
      componentDidMount = async () => {  
        {this.state.titles.forEach((movie) => (
            this.fetchMovies(movie)
        ))}
      };

      FindMovie = (query) => {
        const clone = { ...this.state.array };
        this.setState({input:query})
          if (this.state.input.length>1) {
                let filteredMovies = this.state.movies.filter((movie) =>
                    movie.Title.toLowerCase().includes(this.state.input.toLowerCase())
                );
              this.setState({ filtered: filteredMovies });
          } else{
            this.setState({ filtered: this.state.array });
          }
      };
  
     render(props){
        return (
            <div>
                <Container fluid className=" justify-content-center mt-3 mx-0 mb-5" style={{overflowX: "hidden", backgroundColor: "#2c2c2c", color:"#ffff"}}>
                        <div className="d-flex align-items-center justify-content-start m-0">
                        <h2>TV SHOWS</h2>
                        <select>
                            <option>genres</option>
                        </select>
                        <FormControl
                        className="ml-4"
                            placeholder="Search movies"
                            aria-label="Search"
                            style={{ width: "200px" }}
                            value={this.state.input}

                            onChange={(e) => this.FindMovie(e.target.value)}
                        />
                        </div>
                   <Row className="mt-3 mb-5">
                   {this.state.filtered.map((m, index) => (
                            <SingleMovie movie={m} key={index} />
                        ))}
                    </Row>
                </Container>
            
            </div>
        );
    }
}

export default MovieList;