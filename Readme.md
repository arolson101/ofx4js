# Ofx4js
A pure javascript port of [OFX4J](http://ofx4j.sourceforge.net/)- an [OFX](http://ofx.net/)
implementation.  Works in node.js and in browsers (see security note below).

Note: There is no affiliation between the Ofx4j and Ofx4js projects.

## Installation
Install with
```
  npm install ofx4js
```
Then
```
  import * as ofx4js from 'ofx4js';
```
## Usage
To parse an OFX response:

```js
  // aliases
  import { AggregateUnmarshaller, ResponseEnvelope } from 'ofx4js';

  // your ofx data
  var ofxData = "OFXHEADER:100...";

  // an unmarshaller that will read responses.  Note you will use a
  //  ResponseEnvelope to read responses, and a RequestEnvelope to read
  //  requests.
  var m = new AggregateUnmarshaller(ResponseEnvelope);

  // parse the string into the ofx data structures
  var data = m.unmarshal(ofxData);

  // read the data
  var messageSets = data.getMessageSets();
  var bankingResponse = messageSets[1].cast<BankingResponseMessageSet>().getStatementResponse();
```

To download a bank's profile information:

```js
  // aliases
  import { BaseFinancialInstitutionData, OFXV1Connection } from 'ofx4js';

  // input your bank's information.  See http://www.ofxhome.com/
  var bank = new BaseFinancialInstitutionData();
  bank.setFinancialInstitutionId(...);
  bank.setOrganization(...);
  bank.setOFXURL(...);
  bank.setName(...);

  var connection = new OFXV1Connection();

  var service = new FinancialInstitutionImpl(bank, connection);
  return service.readProfile()
  .then(function(data) {
    // data successfully retrieved
    console.log(data);
  });
```

NOTE: making an OFX connection will fail security checks in browsers.  On Chrome you
can make it run with the "--disable-web-security" command-line option

e.g. (OSX): open /Applications/Google\ Chrome.app --args --disable-web-security

## Status
Presently it can parse ofx strings, create ofx requests, and contact servers.
Good enough to get started, but expect bugs.

## Port
Ofx4js was ported from Ofx4j at r45 (1.7)

This project contains a lot of files that were ported from java to javascript by a combination of
a perl script and a lot of hand editing.  Because of syntax differences between the two languages,
not everything ported especially cleanly.  There are probably hidden bugs stemming from the port.

Because the code is a port, there are a lot of java-isms (e.g. property accessors) that don't make sense
in javascript and could probably be simplified.  There are no plans to address this.

This is not a full port of ofx4j- specifically, the server portion is gone, as are the
FinancialInstitutionDataStore-related classes.  That is, you will have to provide your own financial insitution

## Contributing
Github push requests are welcome.  Please create test cases.  Bugs that are originally in Ofx4j should
be contributed to that project.

## License
Ofx4j was released under the Apache License V2.0.  The license has been kept on files originally from that
project, and where applicable the files remain under that license.  Where not specified (i.e., the files
created especially for the javascript port) the files are released under the MIT license.
