import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import {Component} from "react";
import MarvelServices from "../../services/MarvelServices";

class CharList extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        limit: 9,
        characters: null,
        charEnded: false
    }

    marvelServices = new MarvelServices()

    onCharsLoaded = (characters) => {
        this.setState({characters})
    }

    getAllChar = () => {
        this.marvelServices
            .getAllCharacter(this.state.limit)
            .then(this.onCharsLoaded)
    }

    componentDidMount() {
        this.getAllChar()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.limit !== prevState.limit) {
            this.getAllChar()
        }
    }

    handleClickCharId = (id) => {
        this.props.getChar(id)
    }

    handleClickLoadMore = () => {
        if (this.state.limit === 27) {
            this.setState({
                charEnded: true
            })
        }
        this.setState({
            limit: this.state.limit + 9
        })
    }

    render() {

        const { characters, charEnded } = this.state

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {characters?.map(item =>
                        <li
                            key={item.id}
                            className="char__item"
                            onClick={() => this.handleClickCharId(item.id)}
                        >
                            <img src={item.thumbnail.path + '.' + item.thumbnail.extension} alt="character_img"/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )}
                </ul>
                <button
                    onClick={this.handleClickLoadMore}
                    style={{display: charEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;