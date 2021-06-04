import React, { memo } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import { NotFound } from '../../common/NotFound';
import './ArticleDetails.scss';
import '../pcview/style.css'

/**
 *
 * @param {*} props
 * @returns {JSX} JSX element
 */
function ArticleDetailsComponent(props) {
//console.log('articleDetails', props.size)
const origSize = props.size;
const bp = 830;

//srticleid saved the id of the article
	const { articleId } = props.match.params;
	//findindex method loops through the articles array to find id and match them
	const articleIndex = props.articles.findIndex(article => Number(article.id)=== Number(articleId));
 //if article index is less than 1 show the not found component
	if (articleIndex === -1) {
		return(<NotFound />)
	}

	//article holds all the arrayresuts of article index
	const article = props.articles[articleIndex];
	console.log('froArticleDetails',article)
	console.log('froArticleDetails',articleIndex)

	return (
		//Ternary to make display decision
		(origSize <= bp) ?
		(<div className='int'>
			<Card>
				<Row>
					<Col sm={6} xs={12} lg={4}>
					<img
					src={article.media[0]['media-metadata'][2].url} 
					className='img-responsive'
					top 
					alt="airticleImage" 
					/>
					
					</Col>
					
					<Col sm={6} xs={12} lg={8}>
						<CardBody>
							
							<CardTitle>{article.title}</CardTitle>
							<CardText>{article.abstract}</CardText>
							<a href={article.url} target="_blank" rel="noopener noreferrer">
								<CardText className="continue-link">
									Continue Reading...
									<i className="fa fa-chevron-right img-responsive"></i>
								</CardText>
							</a>
							<CardText className="detail-small-text">
								<small className="text-muted left-detail">
									{article.byline}
								</small>
								<small className="text-muted right-detail">
									{article.published_date}
								</small>
							</CardText>	
						</CardBody>
						<div className="prev-next">
							{articleIndex >= 1 &&
								<Link 
									className="prev-link"
									to={`/${props.articles[articleIndex - 1].id}`}
								>
								Previous Article
									<i className="fa fa-chevron-left prev-next"></i>
								</Link>
							}
							{articleIndex < props.articles.length - 1 &&
								<Link 
									to={`/${props.articles[articleIndex + 1].id}`}
									className="next-link"
								>
									Next Article
									<i className="fa fa-chevron-right prev-next"></i>
								</Link>
							}
						</div>
					</Col>
				</Row>
			</Card>
		</div>)
		
		:


		(<div className="pcView">
		<div>
			<div className='pcView_main'>
				<div className='pcView_imgDiv'>
					<img 
						className='pcView_img-responsive'
						
						src={article.media[0]['media-metadata'][2].url} 
						alt="airticleImage" 
					/>
				</div>
				<div>
					<CardBody>
						<h3>{article.title}</h3>
						<CardText>{article.abstract}</CardText>
						<a href={article.url} target="_blank" rel="noopener noreferrer">
							<CardText className="pcView_continue-link">
								Continue Reading...
								<i className="fa fa-chevron-right img-responsive"></i>
							</CardText>
						</a>
						<div className="pcView_detail-small-text">
							<small className="pcView_text-muted left-detail">
								{article.byline}
							</small>
							<small className="pcView_text-muted pcView_right-detail">
								{article.published_date}
							</small>
						</div>	
					</CardBody>
					<div className="pcView_prev-next">
						{articleIndex >= 1 &&
						<div>
							<Link 
								className="pcView_prev-link"
								to={`/${props.articles[articleIndex - 1].id}`}
							>
								<i className="fa fa-chevron-left pcView_prev-next"></i>
								Previous Article
							</Link>
							</div>
						}
						{articleIndex < props.articles.length - 1 &&
						<div>
							<Link 
								to={`/${props.articles[articleIndex + 1].id}`}
								className="pcView_next-link"
							>
								Next Article
								<i className="fa fa-chevron-right pcView_prev-next"></i>
							</Link>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
		</div>)	
)};

export const ArticleDetails = memo(ArticleDetailsComponent);