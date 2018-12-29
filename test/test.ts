import * as debug from 'debug';
import {
  AggregateUnmarshaller,
  RequestEnvelope,
  ResponseEnvelope,
  FinancialInstitutionImpl,
  BaseFinancialInstitutionData,
  OFXV1Connection,
  KnownCode,
  SignonRequestMessageSet,
  BankingRequestMessageSet,
  SignonResponseMessageSet,
  BankingResponseMessageSet,
  BankStatementResponseTransaction,
  AccountType,
} from '../src'

// http://www.ofx.net/OFXExamplesPage/OFXExamples.aspx

// The request an open-ended statement download (no start/end dates) for savings account # 098-121:
const ofxStatementDownloadv1 =
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
const ofxResponsev1 =
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



function enableLog() {
  debug.enable('ofx4js:*');
}

describe("ofx parsing", function () {
  test("should parse an ofx statement request", function () {
    const m = new AggregateUnmarshaller(RequestEnvelope);
    const data = m.unmarshal(ofxStatementDownloadv1);
    expect(data).toBeTruthy();

    const messageSets = data.getMessageSets().values();
    expect(messageSets).toHaveLength(2);
    expect(messageSets[0]).toBeInstanceOf(SignonRequestMessageSet);
    expect(messageSets[1]).toBeInstanceOf(BankingRequestMessageSet);

    const signonRequest = messageSets[0].cast<SignonRequestMessageSet>().getSignonRequest();
    expect(signonRequest.getUserId()).toBe("Greg123");
    expect(signonRequest.getPassword()).toBe("Greg");
    expect(signonRequest.getApplicationId()).toBe("QWIN");
    expect(signonRequest.getApplicationVersion()).toBe("0900");
    expect(signonRequest.getLanguage()).toBe("ENG");
    const date = new Date(Date.UTC(2007, 10 - 1, 15, 2 + 8, 15, 29, 0)); // 20071015021529.000[-8:PST]
    expect(signonRequest.getTimestamp().toString()).toBe(date.toString());

    const fi = signonRequest.getFinancialInstitution();
    expect(fi).toBeTruthy();
    expect(fi.getOrganization()).toBe("MYBANK");
    expect(fi.getId()).toBe("01234");

    const bankStatementRequest = messageSets[1].cast<BankingRequestMessageSet>().getStatementRequest().getMessage();
    const account = bankStatementRequest.getAccount();
    expect(account.getAccountNumber()).toBe("098-121");
    expect(account.getAccountType()).toBe(AccountType.SAVINGS);
    expect(account.getBankId()).toBe("987654321");
  });

  test("should parse an ofx response", function () {
    const m = new AggregateUnmarshaller(ResponseEnvelope);
    const data = m.unmarshal(ofxResponsev1);
    expect(data).toBeTruthy();

    const messageSets = data.getMessageSets().values();
    expect(messageSets).toHaveLength(2);
    expect(messageSets[0]).toBeInstanceOf(SignonResponseMessageSet);
    expect(messageSets[1]).toBeInstanceOf(BankingResponseMessageSet);

    const signonResponse = messageSets[0].cast<SignonResponseMessageSet>().getSignonResponse();
    expect(signonResponse.getStatus().getCode()).toBe(KnownCode.SUCCESS);

    const fi = signonResponse.getFinancialInstitution();
    expect(fi).toBeTruthy();
    expect(fi.getOrganization()).toBe("MYBANK");
    expect(fi.getId()).toBe("01234");

    expect(messageSets[1].cast<BankingResponseMessageSet>().getStatementResponses()).toHaveLength(1);
    const bankingResponse = messageSets[1].cast<BankingResponseMessageSet>().getStatementResponse();
    expect(bankingResponse).toBeInstanceOf(BankStatementResponseTransaction);
    expect(bankingResponse.getStatus().getCode()).toBe(KnownCode.SUCCESS);

    const message = bankingResponse.getMessage();
    const account = message.getAccount();
    expect(account.getAccountNumber()).toBe("098-121");
    expect(account.getAccountType()).toBe(AccountType.SAVINGS);
    expect(account.getBankId()).toBe("987654321");
    expect(message.getCurrencyCode()).toBe("USD");
    expect(message.getAvailableBalance().getAmount()).toBe(5250.00);
    expect(message.getLedgerBalance().getAmount()).toBe(5250.00);

    const transactions = message.getTransactionList().getTransactions();
    expect(transactions).toHaveLength(3);
    expect(transactions[0].getAmount()).toBe(200.00);
    expect(transactions[1].getAmount()).toBe(150.00);
    expect(transactions[2].getAmount()).toBe(-100.00);
  });

  xtest("should download profile info from a bank", async function () {
    const bank = new BaseFinancialInstitutionData();

    // TODO- input your information.  See http://www.ofxhome.com/
    bank.setFinancialInstitutionId("");
    bank.setOrganization("");
    bank.setOFXURL("");
    bank.setName("");

    expect(bank.getFinancialInstitutionId()).toBeTruthy();
    expect(bank.getOrganization()).toBeTruthy();
    expect(bank.getOFXURL()).toBeTruthy();
    expect(bank.getName()).toBeTruthy();

    const connection = new OFXV1Connection();

    // NOTE: making an OFX connection will fail security checks in browsers.  On Chrome you
    // can make it run with the "--disable-web-security" command-line option
    // e.g. (OSX): open /Applications/Google\ Chrome.app --args --disable-web-security
    const service = new FinancialInstitutionImpl(bank, connection);
    const data = await service.readProfile()
    console.log(data);
  });
});
