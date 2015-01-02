/*global ofx4js, chai, sinon, describe, before, beforeEach, after, afterEach, it */
/*jshint -W106*/

'use strict';

/* jshint -W098 */
var assert = chai.assert;
var expect = chai.expect;

// http://www.ofx.net/OFXExamplesPage/OFXExamples.aspx

// The request an open-ended statement download (no start/end dates) for savings account # 098-121:
var ofxStatementDownloadv1 =
    "OFXHEADER:100\n" +
    "DATA:OFXSGML\n" +
    "VERSION:102\n" +
    "SECURITY:NONE\n" +
    "ENCODING:USASCII\n" +
    "CHARSET:1252\n" +
    "COMPRESSION:NONE\n" +
    "OLDFILEUID:NONE\n" +
    "NEWFILEUID:NONE\n" +
    "\n" +
    "<OFX>\n" +
    "  <SIGNONMSGSRQV1>\n" +
    "    <SONRQ>\n" +
    "      <DTCLIENT>20071015021529.000[-8:PST]\n" +
    "      <USERID>Greg123\n" +
    "      <USERPASS>Greg\n" +
    "      <LANGUAGE>ENG\n" +
    "      <FI>\n" +
    "        <ORG>MYBANK\n" +
    "        <FID>01234\n" +
    "      </FI>\n" +
    "      <APPID>QWIN\n" +
    "      <APPVER>0900\n" +
    "    </SONRQ>\n" +
    "  </SIGNONMSGSRQV1>\n" +
    "  <BANKMSGSRQV1>\n" +
    "    <STMTTRNRQ>\n" +
    "      <TRNUID>23382938\n" +
    "      <STMTRQ>\n" +
    "        <BANKACCTFROM>\n" +
    "          <BANKID>987654321\n" +
    "          <ACCTID>098-121\n" +
    "          <ACCTTYPE>SAVINGS\n" +
    "        </BANKACCTFROM>\n" +
    "        <INCTRAN>\n" +
    "          <INCLUDE>Y\n" +
    "        </INCTRAN>\n" +
    "      </STMTRQ>\n" +
    "    </STMTTRNRQ>\n" +
    "  </BANKMSGSRQV1>\n" +
    "</OFX>\n";

// The Response shows three transactions, two credits and a debit (check):
var ofxResponsev1 =
    "OFXHEADER:100\n" +
    "DATA:OFXSGML\n" +
    "VERSION:103\n" +
    "SECURITY:NONE\n" +
    "ENCODING:USASCII\n" +
    "CHARSET:1252\n" +
    "COMPRESSION:NONE\n" +
    "OLDFILEUID:NONE\n" +
    "NEWFILEUID:NONE\n" +
    "\n" +
    "<OFX>\n" +
    "  <SIGNONMSGSRSV1>\n" +
    "    <SONRS>\n" +
    "      <STATUS>\n" +
    "        <CODE>0\n" +
    "        <SEVERITY>INFO\n" +
    "      </STATUS>\n" +
    "      <DTSERVER>20071015021529.000[-8:PST]\n" +
    "      <LANGUAGE>ENG\n" +
    "      <DTACCTUP>19900101000000\n" +
    "      <FI>\n" +
    "        <ORG>MYBANK\n" +
    "        <FID>01234\n" +
    "      </FI>\n" +
    "    </SONRS>\n" +
    "  </SIGNONMSGSRSV1>\n" +
    "  <BANKMSGSRSV1>\n" +
    "      <STMTTRNRS>\n" +
    "        <TRNUID>23382938\n" +
    "        <STATUS>\n" +
    "          <CODE>0\n" +
    "          <SEVERITY>INFO\n" +
    "        </STATUS>\n" +
    "        <STMTRS>\n" +
    "          <CURDEF>USD\n" +
    "          <BANKACCTFROM>\n" +
    "            <BANKID>987654321\n" +
    "            <ACCTID>098-121\n" +
    "            <ACCTTYPE>SAVINGS\n" +
    "          </BANKACCTFROM>\n" +
    "          <BANKTRANLIST>\n" +
    "            <DTSTART>20070101\n" +
    "            <DTEND>20071015\n" +
    "            <STMTTRN>\n" +
    "              <TRNTYPE>CREDIT\n" +
    "              <DTPOSTED>20070315\n" +
    "              <DTUSER>20070315\n" +
    "              <TRNAMT>200.00\n" +
    "              <FITID>980315001\n" +
    "              <NAME>DEPOSIT\n" +
    "              <MEMO>automatic deposit\n" +
    "            </STMTTRN>\n" +
    "            <STMTTRN>\n" +
    "              <TRNTYPE>CREDIT\n" +
    "              <DTPOSTED>20070329\n" +
    "              <DTUSER>20070329\n" +
    "              <TRNAMT>150.00\n" +
    "              <FITID>980310001\n" +
    "              <NAME>TRANSFER\n" +
    "              <MEMO>Transfer from checking\n" +
    "            </STMTTRN>\n" +
    "            <STMTTRN>\n" +
    "              <TRNTYPE>PAYMENT\n" +
    "              <DTPOSTED>20070709\n" +
    "              <DTUSER>20070709\n" +
    "              <TRNAMT>-100.00\n" +
    "              <FITID>980309001\n" +
    "                <CHECKNUM>1025\n" +
    "              <NAME>John Hancock\n" +
    "            </STMTTRN>\n" +
    "          </BANKTRANLIST>\n" +
    "          <LEDGERBAL>\n" +
    "            <BALAMT>5250.00\n" +
    "            <DTASOF>20071015021529.000[-8:PST]\n" +
    "          </LEDGERBAL>\n" +
    "          <AVAILBAL>\n" +
    "            <BALAMT>5250.00\n" +
    "            <DTASOF>20071015021529.000[-8:PST]\n" +
    "          </AVAILBAL>\n" +
    "        </STMTRS>\n" +
    "      </STMTTRNRS>\n" +
    "  </BANKMSGSRSV1>\n" +
    "</OFX>\n";

var AggregateUnmarshaller = ofx4js.io.AggregateUnmarshaller;
var RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
var ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;

function enableLog(enabled) {
  ofx4js.util.log.enabled = enabled;
}

describe("ofx parsing", function() {
  it("should parse an ofx statement request", function() {
    var m = new AggregateUnmarshaller(RequestEnvelope);
    var data = m.unmarshal(ofxStatementDownloadv1);
    expect(data).to.be.ok();

    var messageSets = data.getMessageSets();
    expect(messageSets).to.have.length(2);
    expect(messageSets[0]).to.be.an.instanceOf(ofx4js.domain.data.signon.SignonRequestMessageSet);
    expect(messageSets[1]).to.be.an.instanceOf(ofx4js.domain.data.banking.BankingRequestMessageSet);

    var signonRequest = messageSets[0].getSignonRequest();
    expect(signonRequest.getUserId()).to.equal("Greg123");
    expect(signonRequest.getPassword()).to.equal("Greg");
    expect(signonRequest.getApplicationId()).to.equal("QWIN");
    expect(signonRequest.getApplicationVersion()).to.equal("0900");
    expect(signonRequest.getLanguage()).to.equal("ENG");
    //ARO_TODO: date
    
    var fi = signonRequest.getFinancialInstitution();
    expect(fi).to.be.ok();
    expect(fi.getOrganization()).to.equal("MYBANK");
    expect(fi.getId()).to.equal("01234");
    
    var bankStatementRequest = messageSets[1].getStatementRequest().getMessage();
    var account = bankStatementRequest.getAccount();
    expect(account.getAccountNumber()).to.equal("098-121");
    expect(account.getAccountType()).to.equal("SAVINGS");
    expect(account.getBankId()).to.equal("987654321");
  });
  
  it("should parse an ofx response", function() {
    var m = new AggregateUnmarshaller(ResponseEnvelope);
    var data = m.unmarshal(ofxResponsev1);
    expect(data).to.be.ok();

    var messageSets = data.getMessageSets();
    expect(messageSets).to.have.length(2);
    expect(messageSets[0]).to.be.an.instanceOf(ofx4js.domain.data.signon.SignonResponseMessageSet);
    expect(messageSets[1]).to.be.an.instanceOf(ofx4js.domain.data.banking.BankingResponseMessageSet);
    
    var signonResponse = messageSets[0].getSignonResponse();
    expect(signonResponse.getStatus().getCode()).to.equal("0");

    var fi = signonResponse.getFinancialInstitution();
    expect(fi).to.be.ok();
    expect(fi.getOrganization()).to.equal("MYBANK");
    expect(fi.getId()).to.equal("01234");
    
    expect(messageSets[1].getStatementResponses()).to.have.length(1);
    var bankingResponse = messageSets[1].getStatementResponse();
    expect(bankingResponse).to.be.an.instanceOf(ofx4js.domain.data.banking.BankStatementResponseTransaction);
    expect(bankingResponse.getStatus().getCode()).to.equal("0");
    
    var message = bankingResponse.getMessage();
    var account = message.getAccount();
    expect(account.getAccountNumber()).to.equal("098-121");
    expect(account.getAccountType()).to.equal("SAVINGS");
    expect(account.getBankId()).to.equal("987654321");
    expect(message.getCurrencyCode()).to.equal("USD");
    expect(message.getAvailableBalance().getAmount()).to.equal("5250.00");
    expect(message.getLedgerBalance().getAmount()).to.equal("5250.00");

    var transactions = message.getTransactionList().transactions;
    expect(transactions).to.have.length(3);
    expect(transactions[0].getAmount()).to.equal("200.00");
    expect(transactions[1].getAmount()).to.equal("150.00");
    expect(transactions[2].getAmount()).to.equal("-100.00");
  });
});

