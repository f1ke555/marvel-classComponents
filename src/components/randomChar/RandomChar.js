import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelServices from "../../services/MarvelServices";
import Loading from "../loading/Loading";
import ErrorMessage from "../errorMessage/errorMessage";


class RandomChar extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({error: true, loading: false})
    }
    updateChar = () => {
        this.setState({loading: true})
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelServices
            .getCharacterById(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    marvelServices = new MarvelServices()

    componentDidMount() {
        this.updateChar()
        // this.timerId = setInterval(this.updateChar, 3000)
    }


    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {

        const {char: {name, description, thumbnail, homepage, wiki}, loading, error} = this.state

        let imgStyle = {'objectFit' : 'cover'};

        if (thumbnail?.includes('b/40/image_not_available.jpg')) {
            imgStyle = {'objectFit' : 'contain'};
        }
        if (loading) {
            return <Loading/>
        }
        if (error) {
            return <ErrorMessage/>
        }
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img style={imgStyle} src={thumbnail} alt="Random character" className='randomchar__img'/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                        onClick={this.updateChar}
                        className="button button__main">
                        <div
                            className="inner">try it
                        </div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;