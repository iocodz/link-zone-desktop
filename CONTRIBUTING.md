# Rules for contribute in the project

Please if you want to contribute with this open source project, read carefully all our rules. 

## Create a new issue

- Write a self-explained title to the issue
- Always make a description of the issue
- If it is necessary, create the steps to reproduce the bug
- Write the issue in English
- Use the available templates to create the issue

## Issue assigment

- Only assign an issue if you are going to work on it.
- Once you select the issue to work on, assign it to your user.
- After an issue is assigned to you, go to the project and be sure that you have the latest version of develop branch.
- After you are in develop, create a new branch with the `feature` name on it, and the number of the issue, like the following example:
    - `feature/23`

## Pull request to develop

After you finish with the issue, and you want to integrate your changes to `develop`, be sure to fulfill these requirements before:

- Always have `develop` on its latest version.
- `rebase` to the latest version of the `develop` branch. exp: `git rebase origin/develop`
- After the current `feature` branch is successful rebased into `develop`, check if it did not break anything.
- After fix all the possibles problems with the `rebase`, then push the `feature` branch and ask for a pull request to `develop`.

## Integrate develop in master

- After the all team of the project decides that the current version of develop is ready to integrate into master, one of the developers of the core team should integrate it to the **master** branch.
