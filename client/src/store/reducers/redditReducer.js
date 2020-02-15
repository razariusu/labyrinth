// import {
//     SELECT_SUBREDDIT,
//     INVALIDATE_SUBREDDIT,
//     REQUEST_POSTS,
//     RECEIVE_POSTS
//   } from '../actions/actions'

// import {combineReducers} from 'redux'

// // const state = {
// //     selectedSubreddit: 'frontend',
// //     postsBySubreddit: {
// //       frontend: {
// //         isFetching: true,
// //         didInvalidate: false,
// //         items: []
// //       },
// //       reactjs: {
// //         isFetching: false,
// //         didInvalidate: false,
// //         lastUpdated: 1439478405547,
// //         items: [
// //           {
// //             id: 42,
// //             title: 'Confusion about Flux and Relay'
// //           },
// //           {
// //             id: 500,
// //             title: 'Creating a Simple Application Using React JS and Flux Architecture'
// //           }
// //         ]
// //       }
// //     }
// //   }

//   function selectedSubreddit(state = 'reactjs', action) {
//     switch (action.type) {
//       case SELECT_SUBREDDIT:
//         return action.subreddit
//       default:
//         return state
//     }
//   }

//   function posts(
//     state = {
//       isFetching: false,
//       didInvalidate: false,
//       items: []
//     },
//     action
//   ) {
//     switch (action.type) {
//       case INVALIDATE_SUBREDDIT:
//         return Object.assign({}, state, {
//           didInvalidate: true
//         })
//       case REQUEST_POSTS:
//         return Object.assign({}, state, {
//           isFetching: true,
//           didInvalidate: false
//         })
//       case RECEIVE_POSTS:
//         return Object.assign({}, state, {
//           isFetching: false,
//           didInvalidate: false,
//           items: action.posts,
//           lastUpdated: action.receivedAt
//         })
//       default:
//         return state
//     }
//   }

//   function postsBySubreddit(state = {}, action) {
//     switch (action.type) {
//       case INVALIDATE_SUBREDDIT:
//       case RECEIVE_POSTS:
//       case REQUEST_POSTS:
//         return Object.assign({}, state, {
//           [action.subreddit]: posts(state[action.subreddit], action)
//         })
//       default:
//         return state
//     }
//   }

//   const redditReducer = combineReducers({
//     postsBySubreddit,
//     selectedSubreddit
//   })
//   export default redditReducer