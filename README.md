# sfdc-org-compare

Cli that uses [sfdx cli](https://developer.salesforce.com/tools/sfdxcli) to compare metadata between two Orgs.

## Why

- Useful when planning deployments or building deployment packages.
- Preview the differences between Salesforce Production and Sandbox environments.
- When you don't trust the people who have deployed the code from a lower environment.

### Prerequisites

1. [sfdx client](https://developer.salesforce.com/tools/sfdxcli)
1. [VS Code](https://code.visualstudio.com/) (required to print file diffs)

### Install

```
$ npm install sfdc-org-compare -g
```

## Usage

```
$ sfdcclient --help

  Usage: cli [options] [command]

  Options:
    -V, --version     output the version number
    -h, --help        output usage information

  Commands:
    compare [options] <username1> <username2> <retrievetargetdir> <xmlPackage>  Compare metadata between 2 Orgs based on the XML package

```

### parameters

- `retrievetargetdir`: Directory root for the retrieved files
- `xmlPackage`: File path of manifest (package.xml) of components to retrieve
- `username1`: Username or alias for the first org.
- `username2`: Username or alias for the second org.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
