# HTML Program

An [Membrane.io](https://membrane.io/) program to get html templates.

## Usage

1. Install the [Membrane VSCode Extension](https://marketplace.visualstudio.com/items?itemName=membrane.membrane).
2. Setup on extension your [Membrane's CLI binary (mctl)](https://membrane.io/download) path.
3. Login / Sign up with ```mctl login```.
4. Update the program on Membrane with the VSCode Command palette `(cmd+shift+p)`\
  ```> Membrame: Update current program```

## Queries

TODO

## Actions

TODO

# Schema

### Types
```javascript
<Root>
    - Fields
        form(action, path, method, title) -> String<html>
        render(field query) -> String<html>
```
