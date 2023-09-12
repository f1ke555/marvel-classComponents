import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import {Component} from "react";
import MarvelServices from "../../services/MarvelServices";
import Loading from "../loading/Loading";
import ErrorMessage from "../errorMessage/errorMessage";

class CharInfo extends Component {
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
        const {charId} = this.props
        this.setState({loading: true})
        this.marvelServices
            .getCharacterById(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }


    marvelServices = new MarvelServices()
    render() {

        const {char: {name, description, thumbnail, homepage, wiki, comics}, loading, error} = this.state
        let imgStyle = {'objectFit' : 'cover'};

        if (thumbnail?.includes('b/40/image_not_available.jpg')) {
            imgStyle = {'objectFit' : 'contain'};
        }

        if (loading) {
            return <Loading/>
        }

        if (name === undefined) {
            return <span>Выберите персонажа</span>
        }
        return (
            <div className="char__info">
                <div className="char__basics">
                    <img style={imgStyle} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'Данный персонаж не участвовал в комиксах'}
                    {
                        comics?.map((item, index) => {
                            if (index > 10) return;
                            return (
                                <li className="char__comics-item">
                                        {item.name}
                                </li>
                            )
                        })

                    }
                </ul>
            </div>
        )
    }
}

export default CharInfo;