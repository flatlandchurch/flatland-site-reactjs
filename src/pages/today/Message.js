import React from 'react';
import { Markdown } from '@flatland/chokhmah';
import styled from 'styled-components';

import DynamicForm from '../../components/dynamicForm';
import Response from '../../components/response';
import MessageNote from './MessageNote';

const MessageWrapper = styled.div`
	blockquote {
		margin-right: 0;
		margin-left: 20px;
		position: relative;
	}

	blockquote::before {
		content: "";
		display: block;
		position: absolute;
		left: -20px;
		width: 8px;
		background: #acc35b;
		height:  100%;
	}
	
	img {
		max-width: 100%;
	}
	
	h3 {
		border-bottom: 1px solid #dfe0e2;
		padding-bottom: 1rem;
		margin-top: 3rem;
	}
`;

class Message extends React.Component {
	render() {
		const {
			content,
			title,
			week,
			response,
		} = this.props;

		return (
			<MessageWrapper>
				<h2>{title}</h2>
				{
					content.map((c, i) => (
						<React.Fragment key={`message-content-${i}`}>
							<Markdown
								content={c}
							/>
							<MessageNote index={i} week={week} />
						</React.Fragment>
					))
				}
				{
					response &&
						<>
							<h3>Respond</h3>
							{
								response.type === 'form' &&
								<DynamicForm formId={response.formID} />
							}
							{
								response.type === 'standard' &&
									<Response options={response.options} />
							}
						</>
				}
			</MessageWrapper>
		);
	}
}

export default Message;