import { 
	TAB_CREATED,
	TAB_CLOSED,
	TAB_ACTIVE_SET,
	TAB_UPDATED
} from './../constants';

const tabsState = {
	items: [{
		uid: 'untitled-1',
		filename: 'Untitled',
		mode: 'html',
		value: ''
	}],
	active: 0
};

export default function tabs(state = tabsState, action) {
	switch (action.type)
	{
		case TAB_CREATED:
			state.items.push(action.tab);
			console.log(state.items);
			return Object.assign({}, state, {
				items: state.items,
				active: state.items.length - 1
			});
		case TAB_CLOSED:
			// Creates a new tab if the number of tabs is one
			if (state.items.length < 2) {
				return {
					items: [{
						uid: 'untitled',
						filename: 'Untitled',
						mode: 'html',
						value: ''
					}],
					active: 0
				}
			} else {
				const arranged = (uid) => {
					let arr = [];
					const items = state.items
						.filter((item) => {
							return item.uid !== uid;
						});
					items.forEach((item) => {
						arr.push(item);
					});
					return arr;
				}
				return Object.assign({}, {}, {
					items: arranged(action.uid),
					active: 0
				});
			}
		case TAB_ACTIVE_SET:
		console.log("Active set");
			return Object.assign({}, state, {
				active: action.index
			});
		case TAB_UPDATED:
			state.items[state.active] = action.tab;
			return Object.assign({}, state, {
				items: state.items
			});
		default:
			return state;
	}
}
