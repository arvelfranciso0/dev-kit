export const GIT_COMMANDS = [
  {
    category: "Setup & Config",
    commands: [
      {
        cmd: 'git config --global user.name "name"',
        desc: "Set global username",
      },
      {
        cmd: 'git config --global user.email "email"',
        desc: "Set global email",
      },
      {
        cmd: "git config --global core.editor code",
        desc: "Set default editor",
      },
      {
        cmd: "git config --list",
        desc: "List all Git configuration",
      },
      {
        cmd: "git init",
        desc: "Initialize a new local repository",
      },
      {
        cmd: "git clone <repo-url>",
        desc: "Clone a remote repository",
      },
    ],
  },
  {
    category: "Repository Status",
    commands: [
      {
        cmd: "git status",
        desc: "Show working tree status",
      },
      {
        cmd: "git diff",
        desc: "Show unstaged changes",
      },
      {
        cmd: "git diff --staged",
        desc: "Show staged changes",
      },
      {
        cmd: "git log",
        desc: "Show commit history",
      },
      {
        cmd: "git log --oneline --graph --all",
        desc: "Compact visual commit history",
      },
    ],
  },
  {
    category: "Staging & Committing",
    commands: [
      {
        cmd: "git add <file>",
        desc: "Stage a specific file",
      },
      {
        cmd: "git add .",
        desc: "Stage all changes",
      },
      {
        cmd: 'git commit -m "message"',
        desc: "Commit staged changes",
      },
      {
        cmd: "git commit --amend",
        desc: "Modify last commit",
      },
      {
        cmd: "git restore --staged <file>",
        desc: "Unstage a file",
      },
    ],
  },
  {
    category: "Branching",
    commands: [
      {
        cmd: "git branch",
        desc: "List local branches",
      },
      {
        cmd: "git branch -a",
        desc: "List all branches",
      },
      {
        cmd: "git checkout <branch>",
        desc: "Switch branch",
      },
      {
        cmd: "git checkout -b <name>",
        desc: "Create and switch to new branch",
      },
      {
        cmd: "git branch -d <name>",
        desc: "Delete a local branch",
      },
      {
        cmd: "git branch -D <name>",
        desc: "Force delete a local branch",
      },
      {
        cmd: "git merge <branch>",
        desc: "Merge branch into current",
      },
    ],
  },
  {
    category: "Remote Repositories",
    commands: [
      {
        cmd: "git remote -v",
        desc: "Show remote repositories",
      },
      {
        cmd: "git remote add origin <url>",
        desc: "Add remote repository",
      },
      {
        cmd: "git fetch",
        desc: "Fetch updates from remote",
      },
      {
        cmd: "git pull",
        desc: "Fetch and merge remote changes",
      },
      {
        cmd: "git push",
        desc: "Push commits to remote",
      },
      {
        cmd: "git push -u origin <branch>",
        desc: "Push branch and set upstream",
      },
    ],
  },
  {
    category: "Stashing",
    commands: [
      {
        cmd: "git stash",
        desc: "Stash current changes",
      },
      {
        cmd: "git stash list",
        desc: "List stashed changes",
      },
      {
        cmd: "git stash apply",
        desc: "Apply last stash",
      },
      {
        cmd: "git stash pop",
        desc: "Apply and remove last stash",
      },
      {
        cmd: "git stash drop",
        desc: "Delete a stash",
      },
    ],
  },
  {
    category: "Reset & Revert",
    commands: [
      {
        cmd: "git reset --soft HEAD~1",
        desc: "Undo last commit, keep changes staged",
      },
      {
        cmd: "git reset --mixed HEAD~1",
        desc: "Undo last commit, keep changes unstaged",
      },
      {
        cmd: "git reset --hard HEAD~1",
        desc: "Discard last commit and changes",
      },
      {
        cmd: "git revert <commit>",
        desc: "Create a new commit that undoes changes",
      },
    ],
  },
  {
    category: "Tagging",
    commands: [
      {
        cmd: "git tag",
        desc: "List tags",
      },
      {
        cmd: "git tag <name>",
        desc: "Create lightweight tag",
      },
      {
        cmd: 'git tag -a <name> -m "message"',
        desc: "Create annotated tag",
      },
      {
        cmd: "git push origin <tag>",
        desc: "Push tag to remote",
      },
    ],
  },
  {
    category: "Inspection & Debugging",
    commands: [
      {
        cmd: "git show <commit>",
        desc: "Show commit details",
      },
      {
        cmd: "git blame <file>",
        desc: "Show who changed each line",
      },
      {
        cmd: "git reflog",
        desc: "Show reference log",
      },
      {
        cmd: "git bisect",
        desc: "Find commit that introduced a bug",
      },
    ],
  },
  {
    category: "Cleaning",
    commands: [
      {
        cmd: "git clean -n",
        desc: "Preview files to be removed",
      },
      {
        cmd: "git clean -f",
        desc: "Remove untracked files",
      },
      {
        cmd: "git clean -fd",
        desc: "Remove untracked files and directories",
      },
    ],
  },
  {
    category: "Troubleshooting",
    commands: [
      {
        cmd: "git commit --amend",
        desc: "Edit the last commit message",
      },
      {
        cmd: "git cherry-pick <commit>",
        desc: "Apply specific commit to branch",
      },
      {
        cmd: "git rebase <branch>",
        desc: "Reapply commits on top of another base",
      },
      {
        cmd: "git rebase -i HEAD~n",
        desc: "Interactive rebase for editing commits",
      },
      {
        cmd: "git fsck",
        desc: "Check repository integrity",
      },
    ],
  },
];
