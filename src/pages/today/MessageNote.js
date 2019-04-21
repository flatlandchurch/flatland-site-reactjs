import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@flatland/chokhmah';
import uuid from 'uuid/v4';
import { set, get } from 'dot-prop';
import moment from 'moment';

const NoteFooter = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	margin-bottom: 4rem;
`;

const NoteCard = styled.div`
	width: 100%;
	display: block;
	box-shadow: 0 1px 4px 0 rgba(0,0,0,.25);
	border: 1px solid #fff;
	padding: 12px;
	background: #fff;
	margin: 16px 0;
	border-radius: 4px;
	font-size: 16px;
	box-sizing: border-box;
	
	p {
		margin-bottom: 0;
	}
`;

const NoteHeader = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	font-size: 12px;
`;

class MessageNote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editing: false,
			note: '',
			notes: [],
		};
	}

	componentDidMount() {
		this.setState({
			notes: this.getNotes()[0],
		})
	}

	getNotes = () => {
		const noteTree = JSON.parse(window.localStorage.getItem('flatland:messageNotes') || '{}');
		return [get(noteTree, `${this.props.week}.${this.props.index}`, []), noteTree];
	};

	handleSave = () => {
		const [currentNotes, noteTree] = this.getNotes();
		const newNotes = [
			...currentNotes,
			{
				timestamp: Number(new Date()),
				id: uuid(),
				content: this.state.note,
			},
		];

		const newTree = set(noteTree, `${this.props.week}.${this.props.index}`, newNotes);
		this.setState({
			notes: newNotes,
			note: '',
			editing: false,
		});
		window.localStorage.setItem('flatland:messageNotes', JSON.stringify(newTree));
	};

	handleChange = (note) => {
		this.setState({ note })
	};

	render() {
		return (
			<React.Fragment>
				{
					this.state.notes.map((note) => (
						<NoteCard key={note.id}>
							<p>{note.content}</p>
							<NoteHeader>{moment(note.timestamp).format('M/D HH:mm')}</NoteHeader>
						</NoteCard>
					))
				}
				{
					this.state.editing &&
					<TextField
						textarea
						label="Note"
						noResize
						placeholder="Start typing..."
						value={this.state.note}
						onChange={this.handleChange}
					/>
				}
				<NoteFooter>
					{
						this.state.editing ?
							<Button
								context="primary"
								onClick={this.handleSave}
							>
								Save
							</Button> :
							<Button
								context="subtle"
								onClick={() => this.setState({ editing: true })}
							>
								+ Add Note
							</Button>
					}
				</NoteFooter>
			</React.Fragment>
		);
	}
}

export default MessageNote;
