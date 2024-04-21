# About the project

This is a simple Note app built with the Create React App, React Router DOM and Tailwind CSS. The layout is just for work, nothing fancy. :)

You can check it live in: [note-challenge.netlify.app](note-challenge.netlify.app)

## How to run the project:

Rename the `.env.sample` to `.env` and add the API endpoint to the env `REACT_APP_API_URL`.

Example:

```
REACT_APP_API_URL=https://api.challenge.com
```

And run `npm install` and `npm start`, everything should work.

## State Management

I just use the Context API to manage all the states. The state file is on `src/state/index/`.

## API Requests

I make all requests using the fetch API. All requests are in the file `src/utils/api.tsx`.

# More details about each section and components

## Home

This page has an input, so the user can choose what session they want to open. This input will convert the session name to a slug to be URL-friendly. When the user enters the session, the name will be displayed on the header. If the user just enters the URL directly, it will show the slug.

## Notes

After entering a session, this will display all the notes without pagination. As the ID is incremental, I'm sorting the ID to show the newest first. The user can add a note directly from this page. If they want to write more or edit, they can click on the card to open a page for this note.

## Note

The note page is a simple textarea, so the user can edit the note. The note will save 1 second after user stops writing.

## The mentions

Every time the user types "@" this will open a dropdown showing the first five users in the list, sorted by name. If the user continues to type, the dropdown will show the names that start with the letters that the user types, and they can select the name by clicking in the dropdown. All names mentioned will be styled with a different color, but any tag that has a name that is not on the list will not change the style.

## The good, the ugly and the gambiarra\*

> \*Gambiarra is a slang from Brasil, the meaning is something like a "workaround" or "quick-and-dirty solution"

I saw in the challenge description, "We prefer you not rely on third-party libraries if possible", and I take this as a challenge. So I created my own textarea to implement the mention feature. But I had a big problem: I couldn't style the textarea field.

For this, I created a div that stays behind the textarea and sets the textarea text to transparent. So this div accepts the "mention" styling, but the user will still write in an "invisible" textarea. This could cause numerous accessibility issues, but like I said, it was just for fun. :)

And to show the dropdown next to the mention, I created the "useCaretPosition" hook. Based in a codepen that I found on the Internet.
