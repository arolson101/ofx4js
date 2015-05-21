/// <reference path="../src/project.d.ts" />
declare module ofx4js {
    class Error {
        name: string;
        message: string;
        stack: string;
        constructor(message?: string);
    }
    /**
     * Base exception class.
     *
     * @author Ryan Heaton
     */
    class OFXException extends Error {
        private innerError;
        constructor(message?: string, e?: Error);
    }
}
declare module ofx4js {
    /**
     * @author Ryan Heaton
     */
    class OFXRuntimeException extends OFXException {
        constructor(message?: string);
    }
}
declare module ofx4js.meta {
    /**
     * Annotation for a method that returns an OFX aggregate.
     *
     * @author Ryan Heaton
     */
    class Aggregate {
        private _value;
        constructor(value: string);
        /**
         * The name of the aggregate.
         *
         * @return The name of the aggregate.
         */
        value(): string;
    }
}
declare module ofx4js.meta {
    /**
     * convenience function to supply a default value if the given value is not specified
     */
    function _default<T>(value: T, defaultValue: T): T;
    function isAssignableFrom(entryType: any, assignableTo: any): boolean;
    /**
     * a function called on an object instance that will return the desired property value
     */
    interface ReadMethod<Type> {
        (): Type;
    }
    /**
     * a function called on an object instance that will set the desired property value
     */
    interface WriteMethod<Type> {
        (value: Type): void;
    }
    /**
     * parameters used to create a PropertyDescriptor
     */
    interface PropertyDescriptorParams<T> {
        type: any;
        read: ReadMethod<T>;
        write: WriteMethod<T>;
    }
    /**
     * an interface to read and write a value into an object
     */
    class PropertyDescriptor {
        private propertyType;
        private readMethod;
        private writeMethod;
        constructor(params: PropertyDescriptorParams<any>);
        getPropertyType(): any;
        getReadMethod(): ReadMethod<any>;
        getWriteMethod(): WriteMethod<any>;
    }
}
declare module ofx4js.meta {
    interface ChildAggregateParams<T> extends PropertyDescriptorParams<T> {
        order: number;
        name?: string;
        required?: boolean;
        collectionEntryType?: any;
    }
    /**
     * Marks a method as providing a child aggregate (or set of them to a top-level aggregate).
     *
     * @author Ryan Heaton
     */
    class ChildAggregate extends PropertyDescriptor {
        private _name;
        private _required;
        private _order;
        private _collectionEntryType;
        constructor(params: ChildAggregateParams<any>);
        /**
         * Used to specify the name of the aggregate in its context as a child aggregate.
         *
         * @return Used to specify the name of the aggregate in its context as a child aggregate.
         */
        name(): string;
        /**
         * Whether this aggregate is required.
         *
         * @return Whether this aggregate is required.
         */
        required(): boolean;
        /**
         * The order this child aggregate comes in its parent aggregate.
         *
         * @return The order this child aggregate comes in its parent aggregate.
         */
        order(): number;
        /**
         * If the type is a collection, return the type of the elements of the collection (otherwise null)
         */
        collectionEntryType(): any;
    }
}
declare module ofx4js.meta {
    interface HeaderParams<T> extends PropertyDescriptorParams<T> {
        name: string;
    }
    /**
     * An OFX element, applied to a javabean property.
     *
     * @author Ryan Heaton
     */
    class Header extends PropertyDescriptor {
        private _name;
        constructor(params: HeaderParams<any>);
        /**
         * The name of the element.
         *
         * @return The name of the element.
         */
        name(): string;
    }
}
declare module ofx4js.meta {
    interface ElementParams<T> extends PropertyDescriptorParams<T> {
        order: number;
        name: string;
        required?: boolean;
    }
    /**
     * An OFX element, applied to a javabean property.
     *
     * @author Ryan Heaton
     */
    class Element extends PropertyDescriptor {
        private _name;
        private _required;
        private _order;
        constructor(params: ElementParams<any>);
        /**
         * The name of the element.
         *
         * @return The name of the element.
         */
        name(): string;
        /**
         * Whether this element is required.
         *
         * @return Whether this element is required.
         */
        required(): boolean;
        /**
         * The order this element comes in its parent aggregate.
         *
         * @return The order this element comes in its parent aggregate.
         */
        order(): number;
    }
}
declare module ofx4js.log {
    class Log {
        private infoEnabled;
        private debugEnabled;
        constructor();
        setInfoEnabled(value: boolean): void;
        isInfoEnabled(): boolean;
        info(...texts: Array<string>): void;
        setDebugEnabled(value: boolean): void;
        isDebugEnabled(): boolean;
        debug(...texts: Array<string>): void;
        warning(...texts: Array<string>): void;
        error(...texts: Array<string>): void;
    }
    class LogFactory {
        static getLog(clazz: any): any;
    }
}
declare module ofx4js.collections {
    interface CompareFcn<T> {
        (a: T, b: T): number;
    }
    class SortedSet<T> {
        private valueArray;
        private compareFcn;
        private isSorted;
        constructor(compareFcn: CompareFcn<T>);
        values(): Array<T>;
        insert(element: T): void;
        push(element: T): void;
        remove(element: T): boolean;
        count(): number;
    }
}
declare module ofx4js.io {
    import ChildAggregate = ofx4js.meta.ChildAggregate;
    import Element = ofx4js.meta.Element;
    enum AggregateAttributeType {
        CHILD_AGGREGATE = 0,
        ELEMENT = 1,
    }
    /**
     * A generic descriptor for an attribute of an OFX aggregate.
     *
     * @author Ryan Heaton
     */
    class AggregateAttribute {
        private readMethod;
        private writeMethod;
        private attributeType;
        private collectionEntryType;
        private name;
        private order;
        private required;
        private type;
        private toString_;
        private collection;
        constructor(arg: Element | ChildAggregate);
        AggregateAttributeFromElement(elementInfo: Element): void;
        AggregateAttributeFromChildAggregate(childAggregate: ChildAggregate): void;
        get(instance: Object): any;
        set(value: any, instance: Object): void;
        getAttributeType(): any;
        getArrayEntryType(): any;
        getName(): string;
        isRequired(): boolean;
        getOrder(): number;
        getType(): AggregateAttributeType;
        static contentCompare(left: AggregateAttribute, right: AggregateAttribute): number;
        isArray(): boolean;
        toString(): string;
    }
}
declare module ofx4js.io {
    import SortedSet = ofx4js.collections.SortedSet;
    import ChildAggregate = ofx4js.meta.ChildAggregate;
    import Element = ofx4js.meta.Element;
    import Header = ofx4js.meta.Header;
    interface HeaderMap {
        [key: string]: Header;
    }
    interface HeaderValues {
        [key: string]: Object;
    }
    /**
     * Holder for meta information about an aggregate class.
     *
     * @author Ryan Heaton
     */
    class AggregateInfo {
        private name;
        private attributes;
        private headers;
        private owner;
        constructor(name: string, owner: any, parentInfo?: AggregateInfo);
        /**
         * The name of the aggregate.
         *
         * @return The name of the aggregate.
         */
        getName(): string;
        setName(name: string): void;
        getOwner(): any;
        /**
         * The attributes.
         *
         * @return The attributes.
         */
        getAttributes(): SortedSet<AggregateAttribute>;
        /**
         * Get the attribute by the specified name.
         *
         * @param name The name of the attribute.
         * @param orderHint The order at which the attribute should come after in case there are more than one candidates.
         * @param assignableTo The class this attribute must be assignable to
         * @return The attribute by the specified name,
         * or if there are more than one by that name,
         * the first one after the specified order,
         * or if there are none then the first collection that
         * comes after the order hint, or the latest if there
         * are none that come after the order hint, or null.
         */
        getAttribute(name: string, orderHint: number, assignableTo?: any): AggregateAttribute;
        /**
         * Whether this aggregate has headers.
         *
         * @return Whether this aggregate has headers.
         */
        hasHeaders(): boolean;
        /**
         * Get the headers defined by the specific aggregate instance.
         *
         * @param instance The aggregate instance.
         * @return The headers.
         */
        getHeaders(instance: Object): HeaderValues;
        /**
         * The type of the specified header.
         *
         * @param name The header name.
         * @return The header type, or null if no header by the specified name exists.
         */
        getHeaderType(name: string): any;
        /**
         * Set the header value for the specified instance.
         *
         * @param instance The instance.
         * @param name     The name of the header.
         * @param value    the value of the header.
         */
        setHeader(instance: Object, name: string, value: Object): void;
        addChildAggregate(childAggregate: ChildAggregate): void;
        addElement(element: Element): void;
        addHeader(header: Header): void;
    }
}
declare module ofx4js.io {
    import ChildAggregate = ofx4js.meta.ChildAggregate;
    import Header = ofx4js.meta.Header;
    import Element = ofx4js.meta.Element;
    /**
     * Introspector for aggregate information.
     *
     * @author Ryan Heaton
     */
    class AggregateIntrospector {
        private static AGGREGATE_CLASSES_BY_NAME;
        private static placeholderName;
        /**
         * Get the aggregate meta information for the specified class.
         *
         * @param clazz the aggregate class.
         * @return The aggregate meta information, or null if the class isn't an aggregate.
         */
        static getAggregateInfo(clazz: any): AggregateInfo;
        private static getAncestorAggregateInfo(clazz);
        /**
         * Find the aggregate class by name.
         *
         * @param aggregateName The name of the aggregate.
         * @return The aggregate class.
         */
        static findAggregateByName(aggregateName: string): any;
        static addAggregate(clazz: any, name: string): void;
        static addChildAggregate(clazz: any, childAggregate: ChildAggregate): void;
        static addElement(clazz: any, element: Element): void;
        static addHeader(clazz: any, header: Header): void;
    }
}
declare module ofx4js.meta {
    function Aggregate_add(clazz: Object, value?: string): void;
}
declare module ofx4js.meta {
    function Element_add<Type>(clazz: any, params: ElementParams<Type>): void;
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    class StatusCode {
        getCode(): number;
        getMessage(): string;
        getDefaultSeverity(): Severity;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * Severity of the status.
     */
    enum Severity {
        INFO = 0,
        WARN = 1,
        ERROR = 2,
    }
    /**
     * Known status codes.
     */
    class KnownCode extends StatusCode {
        static SUCCESS: KnownCode;
        static CLIENT_UP_TO_DATE: KnownCode;
        static GENERAL_ERROR: KnownCode;
        static GENERAL_ACCOUNT_ERROR: KnownCode;
        static ACCOUNT_NOT_FOUND: KnownCode;
        static ACCOUNT_CLOSED: KnownCode;
        static ACCOUNT_NOT_AUTHORIZED: KnownCode;
        static DATE_TOO_SOON: KnownCode;
        static DUPLICATE_REQUEST: KnownCode;
        static UNSUPPORTED_VERSION: KnownCode;
        static INVALID_TAN: KnownCode;
        static MFA_CHALLENGE_REQUIRED: KnownCode;
        static MFA_CHALLENGE_FAILED: KnownCode;
        static PASSWORD_CHANGE_REQUIRED: KnownCode;
        static SIGNON_INVALID: KnownCode;
        static CUSTOMER_ACCOUNT_IN_USE: KnownCode;
        static PASSWORD_LOCKED: KnownCode;
        static INVALID_CLIENT_UID: KnownCode;
        static CONTACT_FI: KnownCode;
        static AUTHTOKEN_REQUIRED: KnownCode;
        static INVALID_AUTHTOKEN: KnownCode;
        static NO_DATA: KnownCode;
        static DB_EXCEPTION: KnownCode;
        static NO_TAXSUPPORT: KnownCode;
        static KnownCodes: KnownCode[];
        private code;
        private message;
        private defaultSeverity;
        constructor(code: number, message: string, defaultSeverity: Severity);
        getCode(): number;
        getMessage(): string;
        getDefaultSeverity(): Severity;
        static fromCode(code: number): KnownCode;
        toString(): string;
    }
    /**
     * Transaction status element.
     *
     * @author Ryan Heaton
     * @see "Section 3.1.4, OFX Spec"
     */
    class Status {
        private code;
        private severity;
        private message;
        constructor();
        /**
         * Status code.
         *
         * @return The status code.
         */
        getCode(): StatusCode;
        /**
         * Status code.
         *
         * @param code Status code.
         */
        setCode(code: StatusCode): void;
        /**
         * The severity.
         *
         * @return The severity.
         */
        getSeverity(): Severity;
        /**
         * The severity.
         *
         * @param severity The severity.
         */
        setSeverity(severity: Severity): void;
        /**
         * Server-supplied message.
         *
         * @return Server-supplied message.
         */
        getMessage(): string;
        /**
         * Server-supplied message.
         *
         * @param message Server-supplied message.
         */
        setMessage(message: string): void;
    }
}
declare module ofx4js {
    import Status = ofx4js.domain.data.common.Status;
    /**
     * Exception based on a StatusCode response
     *
     * @author Michael Mosseri
     */
    class OFXStatusException extends OFXException {
        private status;
        constructor(status: Status, message: string);
        getStatus(): Status;
    }
}
declare module ofx4js {
    /**
     * @author Ryan Heaton
     */
    class OFXTransactionException extends OFXException {
        constructor(message?: string);
    }
}
declare module ofx4js {
    /**
     * Thrown for unsupported OFX security type.
     *
     * @author Ryan Heaton
     */
    class UnsupportedOFXSecurityTypeException extends OFXException {
        constructor(message: string);
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    class BalanceInfo {
        private amount;
        private asOfDate;
        /**
         * The amount.
         *
         * @return The amount.
         */
        getAmount(): number;
        /**
         * The amount.
         *
         * @param amount The amount.
         */
        setAmount(amount: number): void;
        /**
         * The as-of date.
         *
         * @return The as-of date.
         */
        getAsOfDate(): Date;
        /**
         * The as-of date.
         *
         * @param asOfDate The as-of date.
         */
        setAsOfDate(asOfDate: Date): void;
    }
}
declare module ofx4js.meta {
    function ChildAggregate_add<Type>(clazz: any, params: ChildAggregateParams<Type>): void;
}
declare module ofx4js.domain.data.common {
    /**
     * Common details about an account.
     *
     * @author Ryan Heaton
     */
    interface AccountDetails {
        /**
         * The account number.
         *
         * @return The account number.
         */
        getAccountNumber(): string;
        /**
         * The account key.
         *
         * @return The account key.
         */
        getAccountKey(): string;
    }
}
declare module ofx4js.domain.data.banking {
    /**
     * @author Ryan Heaton
     *
     * @see "OFX Spec, Section 11.3.1.1"
     */
    enum AccountType {
        CHECKING = 0,
        SAVINGS = 1,
        MONEYMRKT = 2,
        CREDITLINE = 3,
    }
}
declare module ofx4js.domain.data.banking {
    import AccountDetails = ofx4js.domain.data.common.AccountDetails;
    /**
     * Base bank account details.
     *
     * @author Ryan Heaton
     * @see "OFX Spec, Section 11.3.1"
     */
    class BankAccountDetails implements AccountDetails {
        private bankId;
        private branchId;
        private accountNumber;
        private accountType;
        private accountKey;
        /**
         * The routing and transit number.
         *
         * @return The routing and transit number.
         */
        getBankId(): string;
        /**
         * The routing and transit number.
         *
         * @param bankId The routing and transit number.
         */
        setBankId(bankId: string): void;
        /**
         * The routing and transit number.
         *
         * @return The routing and transit number.
         */
        getRoutingNumber(): string;
        /**
         * The routing and transit number.
         *
         * @param routingNumber The routing and transit number.
         */
        setRoutingNumber(routingNumber: string): void;
        /**
         * The branch id.
         *
         * @return The branch id.
         */
        getBranchId(): string;
        /**
         * The branch id.
         *
         * @param branchId The branch id.
         */
        setBranchId(branchId: string): void;
        /**
         * The account number.
         *
         * @return The account number.
         */
        getAccountNumber(): string;
        /**
         * The account number.
         *
         * @param accountNumber The account number.
         */
        setAccountNumber(accountNumber: string): void;
        /**
         * The account type.
         *
         * @return The account type.
         */
        getAccountType(): AccountType;
        /**
         * The account type.
         *
         * @param accountType The account type.
         */
        setAccountType(accountType: AccountType): void;
        /**
         * The account key.
         *
         * @return The account key.
         */
        getAccountKey(): string;
        /**
         * The account key.
         *
         * @param accountKey The account key.
         */
        setAccountKey(accountKey: string): void;
    }
}
declare module ofx4js.domain.data.creditcard {
    import AccountDetails = ofx4js.domain.data.common.AccountDetails;
    /**
     * @author Ryan Heaton
     *
     * @see "OFX Spec, Section 11.3.2"
     */
    class CreditCardAccountDetails implements AccountDetails {
        private accountNumber;
        private accountKey;
        /**
         * The account number.
         *
         * @return The account number.
         */
        getAccountNumber(): string;
        /**
         * The account number.
         *
         * @param accountNumber The account number.
         */
        setAccountNumber(accountNumber: string): void;
        /**
         * The account key.
         *
         * @return The account key.
         */
        getAccountKey(): string;
        /**
         * The account key.
         *
         * @param accountKey The account key.
         */
        setAccountKey(accountKey: string): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    enum CorrectionAction {
        REPLACE = 0,
        DELETE = 1,
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     * @see "Section 5.2, OFX Spec"
     */
    class Currency {
        private code;
        private exchangeRate;
        constructor();
        /**
         * The currency code.
         *
         * @return The currency code.
         * @see java.util.Currency#getCurrencyCode()
         */
        getCode(): string;
        /**
         * The currency code
         *
         * @param code The currency code
         */
        setCode(code: string): void;
        /**
         * The exchange rate.
         *
         * @return The exchange rate.
         */
        getExchangeRate(): number;
        /**
         * The exchange rate.
         *
         * @param exchangeRate The exchange rate.
         */
        setExchangeRate(exchangeRate: number): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    class Payee {
        private name;
        private address1;
        private address2;
        private address3;
        private city;
        private state;
        private zip;
        private country;
        private phone;
        /**
         * The name of the payee.
         *
         * @return The name of the payee.
         */
        getName(): string;
        /**
         * The name of the payee.
         *
         * @param name The name of the payee.
         */
        setName(name: string): void;
        /**
         * The address of the payee.
         *
         * @return The address of the payee.
         */
        getAddress1(): string;
        /**
         * The address of the payee.
         *
         * @param address1 The address of the payee.
         */
        setAddress1(address1: string): void;
        /**
         * The address of the payee.
         *
         * @return The address of the payee.
         */
        getAddress2(): string;
        /**
         * The address of the payee.
         *
         * @param address2 The address of the payee.
         */
        setAddress2(address2: string): void;
        /**
         * The address of the payee.
         *
         * @return The address of the payee.
         */
        getAddress3(): string;
        /**
         * The address of the payee.
         *
         * @param address3 The address of the payee.
         */
        setAddress3(address3: string): void;
        /**
         * The city of the payee.
         *
         * @return The city of the payee.
         */
        getCity(): string;
        /**
         * The city of the payee.
         *
         * @param city The city of the payee.
         */
        setCity(city: string): void;
        /**
         * The state of this payee.
         *
         * @return The state of this payee.
         */
        getState(): string;
        /**
         * The state of this payee.
         *
         * @param state The state of this payee.
         */
        setState(state: string): void;
        /**
         * The postal code of this payee.
         *
         * @return The postal code of this payee.
         */
        getZip(): string;
        /**
         * The postal code of this payee.
         *
         * @param zip The postal code of this payee.
         */
        setZip(zip: string): void;
        /**
         * The country code for this payee.
         *
         * @return The country code for this payee.
         * @see java.util.Locale#getISO3Country()
         */
        getCountry(): string;
        /**
         * The country code for this payee.
         *
         * @param country The country code for this payee.
         */
        setCountry(country: string): void;
        /**
         * The phone number.
         *
         * @return The phone number.
         */
        getPhone(): string;
        /**
         * The phone number.
         *
         * @param phone The phone number.
         */
        setPhone(phone: string): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    enum TransactionType {
        /**
         * generic credit.
         */
        CREDIT = 0,
        /**
         * genertic debit.
         */
        DEBIT = 1,
        /**
         * interest earned.
         */
        INT = 2,
        /**
         * dividend.
         */
        DIV = 3,
        /**
         * bank fee.
         */
        FEE = 4,
        /**
         * service charge.
         */
        SRVCHG = 5,
        /**
         * deposit.
         */
        DEP = 6,
        /**
         * ATM transaction.
         */
        ATM = 7,
        /**
         * point of sale
         */
        POS = 8,
        /**
         * transfer
         */
        XFER = 9,
        /**
         * check
         */
        CHECK = 10,
        /**
         * electronic payment
         */
        PAYMENT = 11,
        /**
         * cash.
         */
        CASH = 12,
        /**
         * direct deposit.
         */
        DIRECTDEP = 13,
        /**
         * merchant-initiated debit
         */
        DIRECTDEBIT = 14,
        /**
         * repeating payment.
         */
        REPEATPMT = 15,
        /**
         * other
         */
        OTHER = 16,
    }
}
declare module ofx4js.domain.data.common {
    import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
    import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
    /**
     * @author Ryan Heaton
     */
    class Transaction {
        private transactionType;
        private datePosted;
        private dateInitiated;
        private dateAvailable;
        private amount;
        private id;
        private correctionId;
        private correctionAction;
        private tempId;
        private checkNumber;
        private referenceNumber;
        private standardIndustrialCode;
        private payeeId;
        private name;
        private payee;
        private bankAccountTo;
        private creditCardAccountTo;
        private memo;
        private currency;
        private originalCurrency;
        /**
         * The transaction type.
         *
         * @return The transaction type.
         */
        getTransactionType(): TransactionType;
        /**
         * The transaction type.
         *
         * @param transactionType The transaction type.
         */
        setTransactionType(transactionType: TransactionType): void;
        /**
         * The date the transaction was posted.
         *
         * @return The date the transaction was posted.
         */
        getDatePosted(): Date;
        /**
         * The date the transaction was posted.
         *
         * @param datePosted The date the transaction was posted.
         */
        setDatePosted(datePosted: Date): void;
        /**
         * The date the transaction was initiated.
         *
         * @return The date the transaction was initiated.
         */
        getDateInitiated(): Date;
        /**
         * The date the transaction was initiated.
         *
         * @param dateInitiated The date the transaction was initiated.
         */
        setDateInitiated(dateInitiated: Date): void;
        /**
         * The date the funds are available.
         *
         * @return The date the funds are available.
         */
        getDateAvailable(): Date;
        /**
         * The date the funds are available.
         *
         * @param dateAvailable The date the funds are available.
         */
        setDateAvailable(dateAvailable: Date): void;
        /**
         * The transaction amount.
         *
         * @return The transaction amount.
         */
        getAmount(): number;
        /**
         * The transaction amount.
         *
         * @param amount The transaction amount.
         */
        setAmount(amount: number): void;
        /**
         * The transaction amount.
         *
         * @return The transaction amount.
         */
        getBigDecimalAmount(): number;
        /**
         * The transaction amount.
         *
         * @param amount The transaction amount.
         */
        setBigDecimalAmount(amount: number): void;
        /**
         * The transaction id (server-assigned).
         *
         * @return The transaction id (server-assigned).
         */
        getId(): string;
        /**
         * The transaction id (server-assigned).
         *
         * @param id The transaction id (server-assigned).
         */
        setId(id: string): void;
        /**
         * The id of the transaction that this is correcting.
         *
         * @return The id of the transaction that this is correcting.
         */
        getCorrectionId(): string;
        /**
         * The id of the transaction that this is correcting.
         *
         * @param correctionId The id of the transaction that this is correcting.
         */
        setCorrectionId(correctionId: string): void;
        /**
         * The action to take on the {@link #getCorrectionId() corrected transaction}.
         *
         * @return The action to take on the {@link #getCorrectionId() corrected transaction}.
         */
        getCorrectionAction(): CorrectionAction;
        /**
         * The action to take on the {@link #getCorrectionId() corrected transaction}.
         *
         * @param correctionAction The action to take on the {@link #getCorrectionId() corrected transaction}.
         */
        setCorrectionAction(correctionAction: CorrectionAction): void;
        /**
         * The server-assigned temporary id for client-initiated transactions.
         *
         * @return The server-assigned temporary id for client-initiated transactions.
         */
        getTempId(): string;
        /**
         * The server-assigned temporary id for client-initiated transactions.
         *
         * @param tempId The server-assigned temporary id for client-initiated transactions.
         */
        setTempId(tempId: string): void;
        /**
         * The check number.
         *
         * @return The check number.
         */
        getCheckNumber(): string;
        /**
         * The check number.
         *
         * @param checkNumber The check number.
         */
        setCheckNumber(checkNumber: string): void;
        /**
         * The reference number.
         *
         * @return The reference number.
         */
        getReferenceNumber(): string;
        /**
         * The reference number.
         *
         * @param referenceNumber The reference number.
         */
        setReferenceNumber(referenceNumber: string): void;
        /**
         * The standard industrial code.
         *
         * @return The standard industrial code.
         */
        getStandardIndustrialCode(): string;
        /**
         * The standard industrial code.
         *
         * @param standardIndustrialCode The standard industrial code.
         */
        setStandardIndustrialCode(standardIndustrialCode: string): void;
        /**
         * The payee id.
         *
         * @return The payee id.
         */
        getPayeeId(): string;
        /**
         * The payee id.
         *
         * @param payeeId The payee id.
         */
        setPayeeId(payeeId: string): void;
        /**
         * The name (description) or the transaction.
         *
         * @return The name (description) or the transaction.
         */
        getName(): string;
        /**
         * The name (description) or the transaction.
         *
         * @param name The name (description) or the transaction.
         */
        setName(name: string): void;
        /**
         * The payee.
         *
         * @return The payee.
         */
        getPayee(): Payee;
        /**
         * The payee.
         *
         * @param payee The payee.
         */
        setPayee(payee: Payee): void;
        /**
         * The bank account the transfer was to.
         *
         * @return The bank account the transfer was to.
         */
        getBankAccountTo(): BankAccountDetails;
        /**
         * The bank account the transfer was to.
         *
         * @param bankAccountTo The bank account the transfer was to.
         */
        setBankAccountTo(bankAccountTo: BankAccountDetails): void;
        /**
         * The credit-card account the transfer was to.
         *
         * @return The credit-card account the transfer was to.
         */
        getCreditCardAccountTo(): CreditCardAccountDetails;
        /**
         * The credit-card account the transfer was to.
         *
         * @param creditCardAccountTo The credit-card account the transfer was to.
         */
        setCreditCardAccountTo(creditCardAccountTo: CreditCardAccountDetails): void;
        /**
         * Notes.
         *
         * @return Notes.
         */
        getMemo(): string;
        /**
         * Notes.
         *
         * @param memo Notes.
         */
        setMemo(memo: string): void;
        /**
         * The currency.
         *
         * @return The currency.
         */
        getCurrency(): Currency;
        /**
         * The currency.
         *
         * @param currency The currency.
         */
        setCurrency(currency: Currency): void;
        /**
         * The original currency.
         *
         * @return The original currency.
         */
        getOriginalCurrency(): Currency;
        /**
         * The original currency.
         *
         * @param originalCurrency The original currency.
         */
        setOriginalCurrency(originalCurrency: Currency): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    class TransactionList {
        private start;
        private end;
        private transactions;
        /**
         * The start date.
         *
         * @return The start date.
         */
        getStart(): Date;
        /**
         * The start date.
         *
         * @param start The start date.
         */
        setStart(start: Date): void;
        /**
         * The end date.
         *
         * @return The end date.
         */
        getEnd(): Date;
        /**
         * The end date.
         *
         * @param end The end date.
         */
        setEnd(end: Date): void;
        /**
         * The transaction list.
         *
         * @return The transaction list.
         */
        getTransactions(): Array<Transaction>;
        /**
         * The transaction list.
         *
         * @param transactions The transaction list.
         */
        setTransactions(transactions: Array<Transaction>): void;
    }
}
declare module ofx4js.client {
    import BalanceInfo = ofx4js.domain.data.common.BalanceInfo;
    import TransactionList = ofx4js.domain.data.common.TransactionList;
    /**
     * @author Ryan Heaton
     */
    interface AccountStatement {
        /**
         * The currency code.
         *
         * @return The currency code.
         * @see java.util.Currency#getCurrencyCode()
         */
        getCurrencyCode(): string;
        /**
         * The transaction list.
         *
         * @return The transaction list.
         */
        getTransactionList(): TransactionList;
        /**
         * The ledger balance.
         *
         * @return The ledger balance.
         */
        getLedgerBalance(): BalanceInfo;
        /**
         * The available balance.
         *
         * @return The available balance.
         */
        getAvailableBalance(): BalanceInfo;
    }
}
declare module ofx4js.client {
    /**
     * A specific account at a financial institution.
     *
     * @author Ryan Heaton
     */
    interface FinancialInstitutionAccount {
        /**
         * Read an account statement.
         *
         * @param start The start date of the statement.
         * @param end The end date of the statement.
         * @return The account statement.
         */
        readStatement(start: Date, end: Date): Promise<AccountStatement>;
    }
}
declare module ofx4js.client {
    import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
    /**
     * @author Ryan Heaton
     */
    interface BankAccount extends FinancialInstitutionAccount {
        /**
         * The details of the account.
         *
         * @return The details of the account.
         */
        getDetails(): BankAccountDetails;
    }
}
declare module ofx4js.client {
    import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
    /**
     * @author Ryan Heaton
     */
    interface CreditCardAccount extends FinancialInstitutionAccount {
        /**
         * The details of the credit card account.
         *
         * @return The details of the credit card account.
         */
        getDetails(): CreditCardAccountDetails;
    }
}
declare module ofx4js.domain.data.investment.accounts {
    import AccountDetails = ofx4js.domain.data.common.AccountDetails;
    /**
     * Aggregate for the details that identifity a brokerage account.
     *
     * @author Jon Perlow
     * @see "OFX Spec, Section 13.6.1"
     */
    class InvestmentAccountDetails implements AccountDetails {
        private brokerId;
        private accountNumber;
        private accountKey;
        /**
         * Gets the broker id.
         *
         * @return the id of the broker
         */
        getBrokerId(): string;
        /**
         * Sets the broker id.
         *
         * @param brokerId the id of the broker
         */
        setBrokerId(brokerId: string): void;
        /**
         * Gets the account number.
         *
         * @return the account number
         */
        getAccountNumber(): string;
        /**
         * Sets the account number.
         *
         * @param accountNumber the account number
         */
        setAccountNumber(accountNumber: string): void;
        /**
         * Gets the account key.
         *
         * @return the account key
         */
        getAccountKey(): string;
        /**
         * Sets the account key.
         *
         * @param accountKey the account key
         */
        setAccountKey(accountKey: string): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * Marker interface for account information.
     *
     * @author Ryan Heaton
     */
    interface AccountInfo {
        /**
         * The account details.
         *
         * @return The account details.
         */
        getAccountDetails(): AccountDetails;
    }
}
declare module ofx4js.domain.data.investment.accounts {
    /**
     * Type of investment account.
     *
     * @author Jon Perlow
     * @see "OFX Spec, Section 13.6.2"
     */
    enum AccountType {
        INDIVIDUAL = 0,
        JOINT = 1,
        TRUST = 2,
        CORPORATE = 3,
    }
    function AccountType_fromOfx(ofxVal: string): AccountType;
}
declare module ofx4js.domain.data.investment.accounts {
    /**
     * Activation status of an account.
     * @see "Section 13.6.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum ActivationStatus {
        ACTIVE = 0,
        PENDING = 1,
        AVAILABLE = 2,
    }
    function ActivationStatus_fromOfx(ofxVal: string): ActivationStatus;
}
declare module ofx4js.domain.data.investment.accounts {
    /**
     * @author Jon Perlow
     * @see "OFX Spec, Section 13.6.2.1"
     */
    enum UnitedStatesAccountType {
        /** A 401(k) retirement account */
        R401K = 0,
        /** A 403(B) retirement account */
        R403B = 1,
        /** An IRA retirement account */
        IRA = 2,
        /** Keough (money purchase/profit sharing) account */
        KEOUGH = 3,
        /** Other account type */
        OTHER = 4,
        /** Salary Reduction Employer Pension Plan */
        SARSEP = 5,
        /** Savings Incentive Match Plan for Employees*/
        SIMPLE = 6,
        /** Regular investment account */
        NORMAL = 7,
        /** Tax Deferred Annuity */
        TDA = 8,
        /** Trust (including UTMA) */
        TRUST = 9,
        /** Custodial account */
        UGMA = 10,
    }
    function UnitedStatesAccountType_fromOfx(ofxVal: string): UnitedStatesAccountType;
}
declare module ofx4js.domain.data.investment.accounts {
    import AccountDetails = ofx4js.domain.data.common.AccountDetails;
    import AccountInfo = ofx4js.domain.data.common.AccountInfo;
    /**
     * Aggregate for the info about a brokerage account.
     *
     * @author Jon Perlow
     * @see "OFX Spec, Section 13.6.2"
     */
    class InvestmentAccountInfo implements AccountInfo {
        private investmentAccount;
        private unitedStatesAccountType;
        private supportsChecking;
        private activationStatus;
        private investmentAccountType;
        private optionLevel;
        /**
         * Gets the investment account this information is referencing.
         *
         * @return the investment account this information is referencing
         */
        getInvestmentAccount(): InvestmentAccountDetails;
        /**
         * Sets the investment account this information is referencing. This is a required field
         * according to the OFX spec.
         *
         * @param investmentAccount the investment account this information is referencing
         */
        setInvestmentAccount(investmentAccount: InvestmentAccountDetails): void;
        getAccountDetails(): AccountDetails;
        /**
         * Gets the United States account type. This is a required field according to the OFX spec.
         * @see "OFX Spec, Section 13.6.1"
         *
         * @return the United States account type
         */
        getUnitedStatesAccountType(): string;
        /**
         * Sets United States account type. This is a required field according to the OFX spec.
         * @see "OFX Spec, Section 13.6.1"
         *
         * @param unitedStatesAccountType the United States account type
         */
        setUnitedStatesAccountType(unitedStatesAccountType: string): void;
        /**
         * Gets the United States account type as one of the well-known types.
         *
         * @return the account type or null if it's not one of the well-known types
         */
        getUnitedStatesAccountTypeEnum(): UnitedStatesAccountType;
        /**
         * Gets whether the account supports checking. This is a required field according to the OFX spec.
         * @see "OFX Spec, Section 13.6.1"
         *
         * @return whether the account supports checking
         */
        getSupportsChecking(): boolean;
        /**
         * Sets whether the account supports checking. This is a required field according to the OFX spec.
         * @see "OFX Spec, Section 13.6.1"
         *
         * @param supportsChecking whether the account supports checking
         */
        setSupportsChecking(supportsChecking: boolean): void;
        /**
         * Gets the activation status for investment statement download. This is a required field
         * according to the OFX spec.
         *
         * @return the activation status
         */
        getActivationStatus(): string;
        /**
         * Sets the activation status for investment statement download. This is a required field
         * according to the OFX spec.
         *
         * @param activationStatus the activation status
         */
        setActivationStatus(activationStatus: string): void;
        /**
         * Gets the activation status as one of the well-known types.
         *
         * @return the activation status or null if it wasn't one of the well known types
         */
        getActivationStatusEnum(): ActivationStatus;
        /**
         * Gets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
         * This is an optional field according to the OFX spec.
         *
         * @return the type of account
         */
        getInvestmentAccountType(): string;
        /**
         * Sets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
         * This is an optional field according to the OFX spec.
         *
         * @param investmentAccountType the type of account
         */
        setInvestmentAccountType(investmentAccountType: string): void;
        /**
         * Gets the type of investment account as one of the well-known types.
         *
         * @return the type of investment account or null if it's not one of the well-known types
         */
        getInvestmentAccountTypeEnum(): AccountType;
        /**
         * Gets the description of option trading privileges. * This is an optional field according to
         * the OFX spec.
         *
         * @return the description of option trading privileges.
         */
        getOptionLevel(): string;
        /**
         * Sets the description of option trading privileges. * This is an optional field according to
         * the OFX spec.
         *
         * @param optionLevel the description of option trading privileges.
         */
        setOptionLevel(optionLevel: string): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    enum AccountStatus {
        /**
         * Available, but not yet requested.
         */
        AVAIL = 0,
        /**
         * Requested, but not yet available.
         */
        PEND = 1,
        /**
         * Active.
         */
        ACTIVE = 2,
    }
}
declare module ofx4js.domain.data.banking {
    import AccountStatus = ofx4js.domain.data.common.AccountStatus;
    import AccountInfo = ofx4js.domain.data.common.AccountInfo;
    import AccountDetails = ofx4js.domain.data.common.AccountDetails;
    /**
     * @author Ryan Heaton
     */
    class BankAccountInfo implements AccountInfo {
        private bankAccount;
        private supportsTransactionDetailOperations;
        private supportsTransferToOtherAccountOperations;
        private supportsTransferFromOtherAccountOperations;
        private status;
        /**
         * The bank account this information is referencing.
         *
         * @return The bank account this information is referencing.
         */
        getBankAccount(): BankAccountDetails;
        /**
         * The bank account this information is referencing.
         *
         * @param bankAccount The bank account this information is referencing.
         */
        setBankAccount(bankAccount: BankAccountDetails): void;
        getAccountDetails(): AccountDetails;
        /**
         * Whether this account supports download of transaction details.
         *
         * @return Whether this account supports download of transaction details.
         */
        getSupportsTransactionDetailOperations(): boolean;
        /**
         * Whether this account supports download of transaction details.
         *
         * @param supportsTransactionDetailOperations Whether this account supports download of transaction details.
         */
        setSupportsTransactionDetailOperations(supportsTransactionDetailOperations: boolean): void;
        /**
         * Whether this account supports transfer operations to other accounts.
         *
         * @return Whether this account supports transfer operations to other accounts.
         */
        getSupportsTransferToOtherAccountOperations(): boolean;
        /**
         * Whether this account supports transfer operations to other accounts.
         *
         * @param supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
         */
        setSupportsTransferToOtherAccountOperations(supportsTransferToOtherAccountOperations: boolean): void;
        /**
         * Whether this account supports transfer operations from other accounts.
         *
         * @return Whether this account supports transfer operations from other accounts.
         */
        getSupportsTransferFromOtherAccountOperations(): boolean;
        /**
         * Whether this account supports transfer operations from other accounts.
         *
         * @param supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
         */
        setSupportsTransferFromOtherAccountOperations(supportsTransferFromOtherAccountOperations: boolean): void;
        /**
         * The account status.
         *
         * @return The account status.
         */
        getStatus(): AccountStatus;
        /**
         * The account status.
         *
         * @param status The account status.
         */
        setStatus(status: AccountStatus): void;
    }
}
declare module ofx4js.domain.data.creditcard {
    import AccountStatus = ofx4js.domain.data.common.AccountStatus;
    import AccountInfo = ofx4js.domain.data.common.AccountInfo;
    import AccountDetails = ofx4js.domain.data.common.AccountDetails;
    /**
     * @author Ryan Heaton
     */
    class CreditCardAccountInfo implements AccountInfo {
        private creditCardAccount;
        private supportsTransactionDetailOperations;
        private supportsTransferToOtherAccountOperations;
        private supportsTransferFromOtherAccountOperations;
        private status;
        /**
         * The credit card account this information is referencing.
         *
         * @return The credit card account this information is referencing.
         */
        getCreditCardAccount(): CreditCardAccountDetails;
        /**
         * The credit card account this information is referencing.
         *
         * @param creditCardAccount The credit card account this information is referencing.
         */
        setCreditCardAccount(creditCardAccount: CreditCardAccountDetails): void;
        getAccountDetails(): AccountDetails;
        /**
         * Whether this account supports download of transaction details.
         *
         * @return Whether this account supports download of transaction details.
         */
        getSupportsTransactionDetailOperations(): boolean;
        /**
         * Whether this account supports download of transaction details.
         *
         * @param supportsTransactionDetailOperations Whether this account supports download of transaction details.
         */
        setSupportsTransactionDetailOperations(supportsTransactionDetailOperations: boolean): void;
        /**
         * Whether this account supports transfer operations to other accounts.
         *
         * @return Whether this account supports transfer operations to other accounts.
         */
        getSupportsTransferToOtherAccountOperations(): boolean;
        /**
         * Whether this account supports transfer operations to other accounts.
         *
         * @param supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
         */
        setSupportsTransferToOtherAccountOperations(supportsTransferToOtherAccountOperations: boolean): void;
        /**
         * Whether this account supports transfer operations from other accounts.
         *
         * @return Whether this account supports transfer operations from other accounts.
         */
        getSupportsTransferFromOtherAccountOperations(): boolean;
        /**
         * Whether this account supports transfer operations from other accounts.
         *
         * @param supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
         */
        setSupportsTransferFromOtherAccountOperations(supportsTransferFromOtherAccountOperations: boolean): void;
        /**
         * The account status.
         *
         * @return The account status.
         */
        getStatus(): AccountStatus;
        /**
         * The account status.
         *
         * @param status The account status.
         */
        setStatus(status: AccountStatus): void;
    }
}
declare module ofx4js.domain.data.signup {
    import InvestmentAccountInfo = ofx4js.domain.data.investment.accounts.InvestmentAccountInfo;
    import BankAccountInfo = ofx4js.domain.data.banking.BankAccountInfo;
    import CreditCardAccountInfo = ofx4js.domain.data.creditcard.CreditCardAccountInfo;
    /**
     * @author Ryan Heaton
     */
    class AccountProfile {
        private description;
        private phone;
        private bankSpecifics;
        private creditCardSpecifics;
        private investSpecifics;
        /**
         * Description of the account.
         *
         * @return The description of the account.
         */
        getDescription(): string;
        /**
         * The description of the account.
         *
         * @param description The description of the account.
         */
        setDescription(description: string): void;
        /**
         * Phone number for the account.
         *
         * @return Phone number for the account.
         */
        getPhone(): string;
        /**
         * Phone number for the account.
         *
         * @param phone Phone number for the account.
         */
        setPhone(phone: string): void;
        /**
         * Account specifics.
         *
         * @return Account specifics.
         */
        getSpecifics(): ofx4js.domain.data.common.AccountInfo;
        /**
         * Account specifics.
         *
         * @param specifics Account specifics.
         */
        setSpecifics(specifics: ofx4js.domain.data.common.AccountInfo): void;
        /**
         * Bank-specific info.
         *
         * @return Bank-specific info.
         */
        getBankSpecifics(): BankAccountInfo;
        /**
         * Bank-specific info.
         *
         * @param bankSpecifics Bank-specific info.
         */
        setBankSpecifics(bankSpecifics: BankAccountInfo): void;
        /**
         * Credit-card account info.
         *
         * @return Credit-card account info.
         */
        getCreditCardSpecifics(): CreditCardAccountInfo;
        /**
         * Credit-card account info.
         *
         * @param creditCardSpecifics Credit-card account info.
         */
        setCreditCardSpecifics(creditCardSpecifics: CreditCardAccountInfo): void;
        /**
         * Investment account info.
         *
         * @return Investment account info.
         */
        getInvestmentSpecifics(): InvestmentAccountInfo;
        /**
         * Investment account info.
         *
         * @param investSpecifics Investment account info.
         */
        setInvestmentSpecifics(investSpecifics: InvestmentAccountInfo): void;
    }
}
declare module ofx4js.client {
    /**
     * Interface for core FI data.  This is the base set of information
     * required in order to initiate a connection to an FI server.
     *
     * @author Ryan Heaton
     */
    interface FinancialInstitutionData {
        /**
         * A unique id for this FI.
         *
         * @return A unique id for this FI.
         */
        getId(): string;
        /**
         * The id of the FI.
         *
         * @return The id of the FI.
         */
        getFinancialInstitutionId(): string;
        /**
         * The name of the FI.
         *
         * @return The name of the FI.
         */
        getName(): string;
        /**
         * The OFX organization name.
         *
         * @return The OFX organization name.
         */
        getOrganization(): string;
        /**
         * The URL to the OFX server for this institution.
         *
         * @return The URL to the OFX server for this institution.
         */
        getOFXURL(): string;
        /**
         * The broker id.
         *
         * @return The broker id.
         */
        getBrokerId(): string;
    }
}
declare module ofx4js.domain.data.profile {
    /**
     * @author Ryan Heaton
     * @see "Section 7.2.1, OFX Spec"
     */
    enum SynchronizationCapability {
        FULL = 0,
        LITE = 1,
    }
}
declare module ofx4js.domain.data {
    /**
     * @author Ryan Heaton
     * @see "Section 4, OFX spec"
     */
    enum ApplicationSecurity {
        NONE = 0,
        TYPE1 = 1,
    }
}
declare module ofx4js.domain.data {
    import SynchronizationCapability = ofx4js.domain.data.profile.SynchronizationCapability;
    /**
     * @author Ryan Heaton
     */
    interface MessageSetProfile {
        /**
         * Version of the message set.
         *
         * @return The version of the message set.
         */
        getVersion(): string;
        /**
         * The name of the service provider (sometimes the message set processing is outsourced).
         *
         * @return The name of the service provider (sometimes the message set processing is outsourced).
         */
        getServiceProviderName(): string;
        /**
         * The URL at which the message set is processed.
         *
         * @return The URL at which the message set is processed.
         */
        getUrl(): string;
        /**
         * The application-level security required for this message set.
         *
         * @return The application-level security required for this message set.
         */
        getSecurity(): ApplicationSecurity;
        /**
         * Whether transport-level security is required for this message set.
         *
         * @return Whether transport-level security is required for this message set.
         */
        isSslRequired(): boolean;
        /**
         * The sign-on realm.
         *
         * @return The sign-on realm.
         */
        getRealm(): string;
        /**
         * The language.
         *
         * @return The language.
         * @see java.util.Locale#getISO3Language()
         */
        getLanguage(): string;
        /**
         * The synchronization capability for this message set.
         *
         * @return The synchronization capability for this message set.
         */
        getSyncCapability(): SynchronizationCapability;
        /**
         * Whether there exists support for resposne-file based error recovery.
         *
         * @return Whether there exists support for resposne-file based error recovery.
         */
        hasFileBasedErrorRecoverySupport(): boolean;
    }
}
declare module ofx4js.domain.data {
    /**
     * The message set type, used to define message set order in the envelope.
     *
     * @author Ryan Heaton
     * @see "Section 2.4.5.2, OFX spec"
     */
    enum MessageSetType {
        signon = 0,
        signup = 1,
        banking = 2,
        creditcard = 3,
        investment = 4,
        interbank_transfer = 5,
        wire_transfer = 6,
        payments = 7,
        email = 8,
        investment_security = 9,
        profile = 10,
        tax1099 = 11,
    }
}
declare module ofx4js.domain.data.profile {
    /**
     * @author Ryan Heaton
     * @see "Section 7.2.2, OFX Spec"
     */
    enum CharacterType {
        ALPHAONLY = 0,
        NUMERICONLY = 1,
        ALPHAORNUMERIC = 2,
        ALPHAANDNUMERIC = 3,
    }
}
declare module ofx4js.domain.data {
    import CharacterType = ofx4js.domain.data.profile.CharacterType;
    /**
     * @author Ryan Heaton
     */
    interface SignonProfile {
        /**
         * The name of the sign-on realm.
         *
         * @return The name of the sign-on realm.
         */
        getRealm(): string;
        /**
         * The minimum number of password characters.
         *
         * @return The minimum number of password characters.
         */
        getMinPasswordCharacters(): number;
        /**
         * The maximum number of password characters.
         *
         * @return The maximum number of password characters.
         */
        getMaxPasswordCharacters(): number;
        /**
         * The type of password characters supported.
         *
         * @return The type of password characters supported.
         */
        getPasswordCharacterType(): CharacterType;
        /**
         * Whether the password is case-sensitive.
         *
         * @return Whether the password is case-sensitive.
         */
        getPasswordCaseSensitive(): boolean;
        /**
         * Whether special characters are allowed in the password.
         *
         * @return Whether special characters are allowed in the password.
         */
        getPasswordSpecialCharsAllowed(): boolean;
        /**
         * Whether spaces are allowed in the password.
         *
         * @return Whether spaces are allowed in the password.
         */
        getPasswordSpacesAllowed(): boolean;
        /**
         * Whether the server can process a password change request for this realm.
         *
         * @return Whether the server can process a password change request for this realm.
         */
        getChangePasswordSupported(): boolean;
        /**
         * Whether the server requires the user to change their password as part of their first signon.
         *
         * @return Whether the server requires the user to change their password as part of their first signon.
         */
        getChangePasswordFirstRequired(): boolean;
        /**
         * Label for a set of additional credentials that the user must supply.
         *
         * @return Label for a set of additional credentials that the user must supply.
         */
        getAdditionalCredientialsLabel1(): string;
        /**
         * Label for a set of additional credentials that the user must supply.
         *
         * @return Label for a set of additional credentials that the user must supply.
         */
        getAdditionalCredientialsLabel2(): string;
        /**
         * Whether a client UID is required for teh sign-on.
         *
         * @return Whether a client UID is required for teh sign-on.
         */
        getClientUIDRequired(): boolean;
        /**
         * Whether an auth token is required for the sign-on.
         *
         * @return Whether an auth token is required for the sign-on.
         */
        getAuthTokenRequiredForFirstSignon(): boolean;
        /**
         * The label of the auth token.
         *
         * @return The label of the auth token.
         */
        getAuthTokenLabel(): string;
        /**
         * The URL for the auth token information.
         *
         * @return The URL for the auth token information.
         */
        getAuthTokenInfoURL(): string;
        /**
         * Whether MFA is supported.
         *
         * @return Whether MFA is supported.
         */
        getMfaSupported(): boolean;
        /**
         * Whether an MFA challenge request is required for the first sign-on into this realm.
         *
         * @return Whether an MFA challenge request is required for the first sign-on into this realm.
         */
        getMfaChallengeRequiredForFirstSignon(): boolean;
    }
}
declare module ofx4js.client {
    import MessageSetProfile = ofx4js.domain.data.MessageSetProfile;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import SignonProfile = ofx4js.domain.data.SignonProfile;
    /**
     * @author Ryan Heaton
     */
    interface FinancialInstitutionProfile {
        /**
         * When this profile was last updated.
         *
         * @return When this profile was last updated.
         */
        getLastUpdated(): Date;
        /**
         * The name of the financial institution.
         *
         * @return The name of the financial institution.
         */
        getFinancialInstitutionName(): string;
        /**
         * The address of the financial institution.
         *
         * @return The address of the financial institution.
         */
        getAddress1(): string;
        /**
         * The address of the financial institution.
         *
         * @return The address of the financial institution.
         */
        getAddress2(): string;
        /**
         * The address of the financial institution.
         *
         * @return The address of the financial institution.
         */
        getAddress3(): string;
        /**
         * The city of the financial institution.
         *
         * @return The city of the financial institution.
         */
        getCity(): string;
        /**
         * The state of this financial institution.
         *
         * @return The state of this financial institution.
         */
        getState(): string;
        /**
         * The postal code of this financial institution.
         *
         * @return The postal code of this financial institution.
         */
        getZip(): string;
        /**
         * The country code for this financial institution.
         *
         * @return The country code for this financial institution.
         * @see java.util.Locale#getISO3Country()
         */
        getCountry(): string;
        /**
         * The phone number to customer service.
         *
         * @return The phone number to customer service.
         */
        getCustomerServicePhone(): string;
        /**
         * The phone number to tech support.
         *
         * @return The phone number to tech support.
         */
        getTechnicalSupportPhone(): string;
        /**
         * The fax number.
         *
         * @return The fax number.
         */
        getFax(): string;
        /**
         * URL for the financial institution.
         *
         * @return URL for the financial institution.
         */
        getSiteURL(): string;
        /**
         * The email for this FI
         *
         * @return The email for this FI
         */
        getEmail(): string;
        /**
         * Get the message set profile for the specified message set.
         *
         * @param type The message set type for which to retrieve the profile.
         * @return The message set profile information, or null if the FI doesn't support any message sets of the specified type.
         * @throws IllegalStateException If multiple versions of the specified message set exist.
         */
        getMessageSetProfile(type: MessageSetType): MessageSetProfile;
        /**
         * Get the message set profile for the specified message set and the specified version.
         *
         * @param type The message set type for which to retrieve the profile.
         * @param version The version for which to retrieve the profile.
         * @return The message set profile information, or null if the FI doesn't support the specified message set of the specified version.
         */
        getMessageSetProfile(type: MessageSetType, version: string): MessageSetProfile;
        /**
         * Get the signon profile for the specified message set.
         *
         * @param messageSet The message set.
         * @return The signon profile, or null if none was found.
         */
        getSignonProfile(messageSet: MessageSetProfile): SignonProfile;
    }
}
declare module ofx4js.client {
    import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
    import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
    import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
    import AccountProfile = ofx4js.domain.data.signup.AccountProfile;
    /**
     * @author Ryan Heaton
     */
    interface FinancialInstitution {
        /**
         * The financial institution data defining this FI.
         *
         * @return The financial institution data.
         */
        getData(): FinancialInstitutionData;
        /**
         * Read the specified financial institution profile. Implies a network call.
         *
         * @return The profile.
         * @throws OFXException if something goes awry.
         */
        readProfile(): Promise<FinancialInstitutionProfile>;
        /**
         * Read the account profiles of the specified user.
         *
         * @param username The username.
         * @param password The password.
         * @return The profiles.
         */
        readAccountProfiles(username: string, password: string): Promise<Array<AccountProfile>>;
        /**
         * Load a bank account.
         *
         * @param details The bank account details.
         * @param username The username.
         * @param password The password.
         * @return The bank account.
         */
        loadBankAccount(details: BankAccountDetails, username: string, password: string): BankAccount;
        /**
         * Load a credit card account.
         *
         * @param details The credit card account details.
         * @param username The username.
         * @param password The password.
         * @return The credit card account.
         */
        loadCreditCardAccount(details: CreditCardAccountDetails, username: string, password: string): CreditCardAccount;
        /**
         * Load an investment account.
         *
         * @param details The investment account details.
         * @param username The username.
         * @param password The password.
         * @return The investment account.
         */
        loadInvestmentAccount(details: InvestmentAccountDetails, username: string, password: string): InvestmentAccount;
    }
}
declare module ofx4js.client {
    /**
     * @author Ryan Heaton
     */
    interface FinancialInstitutionDataStore {
        /**
         * Get the data for the financial institution of the specified id.
         *
         * @param fid The id of the financial institution.
         * @return The financial institution data, or null if none exists for the specified id.
         */
        getInstitutionData(fid: string): FinancialInstitutionData;
        /**
         * Get the whole list of financial institution data.
         *
         * @return The whole list of financial institution data.
         */
        getInstitutionDataList(): Array<FinancialInstitutionData>;
    }
}
declare module ofx4js.client {
    /**
     * @author Ryan Heaton
     */
    interface FinancialInstitutionService {
        /**
         * Get the financial institution by the specified id.
         *
         * @param fid The financial institution id.
         * @return The financial institution, or null if not found.
         */
        getFinancialInstitution(fid: string): FinancialInstitution;
        /**
         * Get the financial institution by the specified data.
         *
         * @param data The financial institution data.
         * @return The financial institution, or null if not found.
         */
        getFinancialInstitution(data: FinancialInstitutionData): FinancialInstitution;
    }
}
declare module ofx4js.domain.data {
    /**
     * A message applicable to a response message set.
     *
     * @author Ryan Heaton
     */
    class ResponseMessage {
        /**
         * The name of the response message.
         *
         * @return The name of the response message.
         */
        getResponseMessageName(): string;
    }
}
declare module ofx4js.domain.data.common {
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import AccountStatement = ofx4js.client.AccountStatement;
    /**
     * @author Ryan Heaton
     */
    class StatementResponse extends ResponseMessage implements AccountStatement {
        private currencyCode;
        private transactionList;
        private ledgerBalance;
        private availableBalance;
        private marketingInfo;
        constructor();
        /**
         * The currency code.
         *
         * @return The currency code.
         * @see java.util.Currency#getCurrencyCode()
         */
        getCurrencyCode(): string;
        /**
         * The currency code.
         *
         * @param currencyCode The currency code.
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * The transaction list.
         *
         * @return The transaction list.
         */
        getTransactionList(): TransactionList;
        /**
         * The transaction list.
         *
         * @param transactionList The transaction list.
         */
        setTransactionList(transactionList: TransactionList): void;
        /**
         * The ledger balance.
         *
         * @return The ledger balance.
         */
        getLedgerBalance(): BalanceInfo;
        /**
         * The ledger balance.
         *
         * @param ledgerBalance The ledger balance.
         */
        setLedgerBalance(ledgerBalance: BalanceInfo): void;
        /**
         * The available balance.
         *
         * @return The available balance.
         */
        getAvailableBalance(): BalanceInfo;
        /**
         * The available balance.
         *
         * @param availableBalance The available balance.
         */
        setAvailableBalance(availableBalance: BalanceInfo): void;
        /**
         * Marketing information. (?)
         *
         * @return Marketing information.
         */
        getMarketingInfo(): string;
        /**
         * Marketing information. (?)
         *
         * @param marketingInfo Marketing information.
         */
        setMarketingInfo(marketingInfo: string): void;
    }
}
declare module ofx4js.domain.data.investment.accounts {
    /**
     * Types of well-known sub-accounts.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum SubAccountType {
        CASH = 0,
        MARGIN = 1,
        SHORT = 2,
        OTHER = 3,
    }
    function SubAccountType_fromOfx(ofxVal: string): SubAccountType;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Identifier for a security.
     * @see "Section 13.8.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityId {
        private uniqueId;
        private uniqueIdType;
        /**
         * Gets the unique id for the security. This is a required field according to the OFX spec.
         *
         * @return the unique id
         */
        getUniqueId(): string;
        /**
         * Sets the unique id for the security. This is a required field according to the OFX spec.
         *
         * @param uniqueId the unique id
         */
        setUniqueId(uniqueId: string): void;
        /**
         * Gets the type of unique id.
         *
         * @return the type of unique id
         */
        getUniqueIdType(): string;
        /**
         * Sets the type of unique id.
         *
         * @param uniqueIdType the type of unique id
         */
        setUniqueIdType(uniqueIdType: string): void;
    }
}
declare module ofx4js.domain.data.investment.positions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Class for the investment position aggregate.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentPosition {
        private securityId;
        private heldInAccount;
        private positionType;
        private units;
        private unitPrice;
        private marketValue;
        private marketValueDate;
        private currencyCode;
        private memo;
        private inv401kSource;
        /**
         * Gets the security id for the position. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the security id for the position
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the security id for the position. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param securityId the security id for the position
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the sub-account type
         */
        getHeldInAccount(): string;
        /**
         * Sets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param heldInAccount the sub-account type
         */
        setHeldInAccount(heldInAccount: string): void;
        /**
         * Gets the sub-account type as one of the well-known types.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the sub-account type or null if it's not one of the well-known types
         */
        getHeldInAccountEnum(): SubAccountType;
        /**
         * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the position type
         */
        getPositionType(): string;
        /**
         * Sets the position type. One of SHORT or LONG. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param positionType the position type
         */
        setPositionType(positionType: string): void;
        /**
         * Gets the position type as one of the well-known types.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the position type or null if it's not one of the well-known types
         */
        getPositionTypeEnum(): PositionType;
        /**
         * Gets the number of units in the position. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the number of units in the position
         */
        getUnits(): number;
        /**
         * Sets the number of units in the position. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param units the number of units in the position
         */
        setUnits(units: number): void;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param unitPrice the per unit price
         */
        setUnitPrice(unitPrice: number): void;
        /**
         * Gets the market value of this position. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the market value of the position
         */
        getMarketValue(): number;
        /**
         * Sets the market value of this position. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param marketValue the market value of the position
         */
        setMarketValue(marketValue: number): void;
        /**
         * Gets the date and time of the unit price and market value. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the market value date
         */
        getMarketValueDate(): Date;
        /**
         * Sets the date and time of the unit price and market value. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param marketValueDate the market value date
         */
        setMarketValueDate(marketValueDate: Date): void;
        /**
         * Gets the currency code of the position. This is an optional field according to the OFX spec.
         * If not present, it's the default currency of the account.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the currency code of the position or null for the default currency
         */
        getCurrencyCode(): string;
        /**
         * Sets the currency code of the position. This is an optional field according to the OFX spec.
         * If not present, it's the default currency of the account.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param currencyCode the currency code of the position or null for the default currency
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the memo associated with the position. This is an optional field according to the OFX
         * spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the memo
         */
        getMemo(): string;
        /**
         * Sets the memo associated with the position. This is an optional field according to the OFX
         * spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @param memo the memo
         */
        setMemo(memo: string): void;
        /**
         * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the 401k source
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the 401k source
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401k source as one of the well-known types.
         *
         * @return the 401k source or null if it's not one of the well-known types
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Types of 401(k) sources.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum Inv401KSource {
        PRETAX = 0,
        AFTER_TAX = 1,
        MATCH = 2,
        PROFIT_SHARING = 3,
        ROLLOVER = 4,
        OTHER_VEST = 5,
        OTHER_NONVEST = 6,
    }
    function Inv401KSource_fromOfx(ofxVal: string): Inv401KSource;
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Type of position.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum PositionType {
        LONG = 0,
        SHORT = 1,
    }
    function PositionType_fromOfx(ofxVal: string): PositionType;
}
declare module ofx4js.domain.data.investment.positions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Base class for the various types of positions.
     * <br>
     * This class exposes a read-only view of the flattened aggregates that are
     * common to all positions as a convenience to application
     * developers who may not find the ofx aggregation model intuitive.
     *
     * @author Jon Perlow
     */
    class BasePosition {
        private investmentPosition;
        /**
         * Gets the investment position child aggregate.
         *
         * @return the investment position child aggregate
         */
        getInvestmentPosition(): InvestmentPosition;
        /**
         * Sets the investment position child aggregate.
         *
         * @param investmentPosition the investment position child aggregate
         */
        setInvestmentPosition(investmentPosition: InvestmentPosition): void;
        /**
         * Gets the security id for the position. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the security id for the position
         */
        getSecurityId(): SecurityId;
        /**
         * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the sub-account type
         */
        getHeldInAccount(): string;
        /**
         * Gets the sub-account type as one of the well-known types.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the sub-account type or null if it's not one of the well-known types
         */
        getHeldInAccountEnum(): SubAccountType;
        /**
         * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the position type
         */
        getPositionType(): string;
        /**
         * Gets the position type as one of the well-known types.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the position type or null if it's not one of the well-known types
         */
        getPositionTypeEnum(): PositionType;
        /**
         * Gets the number of units in the position. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the number of units in the position
         */
        getUnits(): number;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Gets the market value of this position. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the market value of the position
         */
        getMarketValue(): number;
        /**
         * Gets the date and time of the unit price and market value. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the market value date
         */
        getMarketValueDate(): Date;
        /**
         * Gets the currency code of the position. This is an optional field according to the OFX spec.
         * If not present, it's the default currency of the account.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the currency code of the position or null for the default currency
         */
        getCurrencyCode(): string;
        /**
         * Gets the memo associated with the position. This is an optional field according to the OFX
         * spec.
         * @see "Section 13.9.2.6.1, OFX Spec"
         *
         * @return the memo
         */
        getMemo(): string;
        /**
         * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the 401k source
         */
        get401kSource(): string;
        /**
         * Gets the 401k source as one of the well-known types.
         *
         * @return the 401k source or null if it's not one of the well-known types
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Aggregate for a list of invesment positions.
     * @see "Section 13.9.2.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentPositionList {
        private positions;
        /**
         * Gets the list of positions
         *
         * @return the list of positions
         */
        getPositions(): Array<BasePosition>;
        /**
         * Sets the list of positions.
         *
         * @param positions the list of positions
         */
        setPositions(positions: Array<BasePosition>): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Info about a security.
     * @see "Section 13.8.5.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityInfo {
        private securityId;
        private securityName;
        private tickerSymbol;
        private fiId;
        private rating;
        private unitPrice;
        private marketValueDate;
        private currencyCode;
        private memo;
        /**
         * Gets the unique security id for the security. This is a required field according to the OFX
         * spec.
         *
         * @return the security id
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the unique security id for the security. This is a required field according to the OFX
         * spec.
         *
         * @param securityId the security id
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the full name of the security. This is a required field according to the OFX spec.
         *
         * @return the full name of the security
         */
        getSecurityName(): string;
        /**
         * Sets the full name of the security. This is a required field according to the OFX spec.
         *
         * @param securityName the full name of the security
         */
        setSecurityName(securityName: string): void;
        /**
         * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
         *
         * @return the ticket symbol or null if there's no ticker symbol
         */
        getTickerSymbol(): string;
        /**
         * Sets the ticker symbol for the security. This is an optional field according to the OFX spec.
         *
         * @param tickerSymbol the ticket symbol or null if there's no ticker symbol
         */
        setTickerSymbol(tickerSymbol: string): void;
        /**
         * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
         *
         * @return the FI ID number for the security
         */
        getFiId(): string;
        /**
         * Sets the FI ID number for the security. This is an optional field according to the OFX spec.
         *
         * @param fiId the FI ID number for the security
         */
        setFiId(fiId: string): void;
        /**
         * Gets the rating of the security. This is an optional field according to the OFX spec.
         *
         * @return the rating
         */
        getRating(): string;
        /**
         * Sets the rating of the security. This is an optional field according to the OFX spec.
         *
         * @param rating the rating
         */
        setRating(rating: string): void;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a noptional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param unitPrice the per unit price
         */
        setUnitPrice(unitPrice: number): void;
        /**
         * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
         *
         * @return the date as-of for the unit price
         */
        getUnitPriceAsOfDate(): Date;
        /**
         * Sets the date as-of for the unit price. This is an optional field according to the OFX spec.
         *
         * param marketValueDate the date as-of for the unit price
         */
        setUnitPriceAsOfDate(marketValueDate: Date): void;
        /**
         * Gets the overriding currency code for the security. If not set, implies the default currency.
         * This is an optional field according to the OFX spec.
         *
         * @return the overriding currency code or null to mean the default currency
         */
        getCurrencyCode(): string;
        /**
         * Sets the overriding currency code for the security. If not set, implies the default currency.
         * This is an optional field according to the OFX spec.
         *
         * @param currencyCode the overriding currency code or null to mean the default currency
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets any memo associated with the security. This is an optional field according to the OFX
         * spec.
         *
         * @return the memo
         */
        getMemo(): string;
        /**
         * Sets any memo associated with the security. This is an optional field according to the OFX
         * spec.
         *
         * @param memo the memo
         */
        setMemo(memo: string): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Base class for info about the various types of securities.
     * @see "Section 13.8.5.1, OFX Spec"
     * <br>
     * This class exposes a read-only view of the flattened aggregates that are
     * common to all security info as a convenience to application
     * developers who may not find the ofx aggregation model intuitive.
     *
     * @author Jon Perlow
     */
    class BaseSecurityInfo {
        private securityInfo;
        /**
         * Gets the security info aggregate.
         *
         * @return the security info aggregate.
         */
        getSecurityInfo(): SecurityInfo;
        /**
         * Sets the security info aggregate.
         *
         * @param securityInfo the security info aggregate.
         */
        setSecurityInfo(securityInfo: SecurityInfo): void;
        /**
         * Gets the unique security id for the security. This is a required field according to the OFX
         * spec.
         *
         * @return the security id
         */
        getSecurityId(): SecurityId;
        /**
         * Gets the full name of the security. This is a required field according to the OFX spec.
         *
         * @return the full name of the security.
         */
        getSecurityName(): string;
        /**
         * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
         *
         * @return the ticket symbol or null if there's no ticker symbol
         */
        getTickerSymbol(): string;
        /**
         * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
         *
         * @return the FI ID number for the security
         */
        getFiId(): string;
        /**
         * Gets the rating of the security. This is an optional field according to the OFX spec.
         *
         * @return the rating
         */
        getRating(): string;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a noptional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
         *
         * @return the date as-of for the unit price
         */
        getUnitPriceAsOfDate(): Date;
        /**
         * Gets the overriding currency code for the security. If not set, implies the default currency.
         * This is an optional field according to the OFX spec.
         *
         * @return the overriding currency code or null to mean the default currency
         */
        getCurrencyCode(): string;
        /**
         * Gets any memo associated with the security. This is an optional field according to the OFX
         * spec.
         *
         * @return the memo
         */
        getMemo(): string;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Aggregate for a list of securities.
     * @see "Section 13.8.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityList {
        private securityInfos;
        getSecurityInfos(): Array<BaseSecurityInfo>;
        setSecurityInfos(securityInfos: Array<BaseSecurityInfo>): void;
    }
}
declare module ofx4js.domain.data.seclist {
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * Security list response. This is an empty aggregate. The actual security information is included
     * in the "SECLIST" aggregate.
     * @see "Section 13.8.3, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityListResponse extends ResponseMessage {
        getResponseMessageName(): string;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of investment transaction.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum TransactionType {
        BUY_DEBT = 0,
        BUY_MUTUAL_FUND = 1,
        BUY_OPTION = 2,
        BUY_OTHER = 3,
        BUY_STOCK = 4,
        CLOSE_OPTION = 5,
        INCOME = 6,
        INVESTMENT_EXPENSE = 7,
        JOURNAL_FUND = 8,
        JOURNAL_SECURITY = 9,
        MARGIN_INTEREST = 10,
        REINVEST_INCOME = 11,
        RETURN_OF_CAPITAL = 12,
        SELL_DEBT = 13,
        SELL_MUTUAL_FUND = 14,
        SELL_OPTION = 15,
        SELL_OTHER = 16,
        SELL_STOCK = 17,
        SPLIT = 18,
        TRANSFER = 19,
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Base class for all investment transactions.
     * <br>
     * This class exposes a read-only view of the flattened aggregates that are
     * common to all investment transactions as a convenience to application
     * developers who may not find the ofx aggregation model intuitive.
     *
     * @author Jon Perlow
     */
    class BaseInvestmentTransaction {
        private transactionType;
        constructor(transactionType: TransactionType);
        /**
         * Gets the type of transaction.
         *
         * @return the type of transaction
         */
        getTransactionType(): TransactionType;
        /**
         * Gets the {@link InvestmentTransaction} aggregate.
         *
         * @return the {@link InvestmentTransaction} aggregate
         */
        getInvestmentTransaction(): InvestmentTransaction;
        /**
         * Gets the unique financial institution assigned transaction id. This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the financial institution asssigned transaction id
         */
        getTransactionId(): string;
        /**
         * Gets the server assigned transaction id. This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the server assigned transaction id
         */
        getServerId(): string;
        /**
         * Gets the trade date of the transaction. For stock splits, this is the
         * day of record. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the trade date
         */
        getTradeDate(): Date;
        /**
         * Gets the settlement date of the transaction. For stock splits, this is the
         * day of of execution. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the trade date
         */
        getSettlementDate(): Date;
        /**
         * For a reveral transaction, gets the financial institution assigned
         * transaction id for the transaction being revesed.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the transaction id of the transaction being reversed
         */
        getReversalTransactionId(): string;
        /**
         * Gets the memo associated with the transaction. This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the memo
         */
        getMemo(): string;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Investment transaction aggregate ("INVTRAN").
     * @see "Section 13.9.2.4.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentTransaction {
        private transactionId;
        private serverId;
        private tradeDate;
        private settlementDate;
        private reversalTransactionId;
        private memo;
        /**
         * Gets the unique financial institution assigned transaction id. This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the financial institution asssigned transaction id
         */
        getTransactionId(): string;
        /**
         * Sets the unique financial institution assigned transaction id. This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @param transactionId the financial institution asssigned transaction id
         */
        setTransactionId(transactionId: string): void;
        /**
         * Gets the server assigned transaction id. This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the server assigned transaction id
         */
        getServerId(): string;
        /**
         * Sets the server assigned transaction id. This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @param serverId the server assigned transaction id
         */
        setServerId(serverId: string): void;
        /**
         * Gets the trade date of the transaction. For stock splits, this is the
         * day of record. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the trade date
         */
        getTradeDate(): Date;
        /**
         * Sets the trade date of the transaction. For stock splits, this is the
         * day of record. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @param tradeDate the trade date
         */
        setTradeDate(tradeDate: Date): void;
        /**
         * Gets the settlement date of the transaction. For stock splits, this is the
         * day of of execution. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the trade date
         */
        getSettlementDate(): Date;
        /**
         * Sets the settlement date of the transaction. For stock splits, this is the
         * day of of execution. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @param settlementDate the trade date
         */
        setSettlementDate(settlementDate: Date): void;
        /**
         * For a reveral transaction, gets the financial institution assigned
         * transaction id for the transaction being revesed.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the transaction id of the transaction being reversed
         */
        getReversalTransactionId(): string;
        /**
         * For a reveral transaction, gets the financial institution assigned
         * transaction id for the transaction being revesed.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @param reversalTransactionId the transaction id of the transaction being reversed
         */
        setReversalTransactionId(reversalTransactionId: string): void;
        /**
         * Gets the memo associated with the transaction. This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @return the memo
         */
        getMemo(): string;
        /**
         * Sets the memo associated with the transaction. This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.1, OFX Spec"
         *
         * @param memo the memo
         */
        setMemo(memo: string): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Base class for investment transactions that aren't buys or sales..
     * <br>
     * This class exposes a read-only view of the flattened aggregates that are
     * common to all investment transactions as a convenience to application
     * developers who may not find the ofx aggregation model intuitive.
     *
     * @author Jon Perlow
     */
    class BaseOtherInvestmentTransaction extends BaseInvestmentTransaction {
        private investmentTransaction;
        constructor(transactionType: TransactionType);
        /**
         * Gets the {@link InvestmentTransaction} aggregate.
         *
         * @return the {@link InvestmentTransaction} aggregate
         */
        getInvestmentTransaction(): InvestmentTransaction;
        /**
         * Sets the {@link InvestmentTransaction} aggregate.
         *
         * @param investmentTransaction the {@link InvestmentTransaction} aggregate
         */
        setInvestmentTransaction(investmentTransaction: InvestmentTransaction): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import Transaction = ofx4js.domain.data.common.Transaction;
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    /**
     * Bank transactions that are part of an investment account statement. Wraps a {@link Transaction}.
     * @see "Section 13.9.2.3, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentBankTransaction {
        private transaction;
        private subAccountFund;
        /**
         * Gets the wrapped transaction aggregate.
         * @return the wrapped transaction
         */
        getTransaction(): Transaction;
        /**
         * Sets the wrapped transaction aggregate.
         * @param transaction the wrapped transaction
         */
        setTransaction(transaction: Transaction): void;
        /**
         * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.2, OFX Spec"
         *
         * @return the sub account fund for the transaction
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.2, OFX Spec"
         *
         * @param subAccountFund the sub account fund for the transaction
         */
        setSubAccountFund(subAccountFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountFundEnum(): SubAccountType;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * The transaction list aggregate.
     * @see "Section 13.9.1.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentTransactionList {
        private start;
        private end;
        private transactions;
        private bankTransactions;
        /**
         * Gets the start date. This is a required field according to the OFX spec.
         *
         * @return The start date
         */
        getStart(): Date;
        /**
         * Sets the start date. This is a required field according to the OFX spec.
         *
         * @param start The start date
         */
        setStart(start: Date): void;
        /**
         * Gets the end date. This is a required field according to the OFX spec.
         *
         * @return he end date
         */
        getEnd(): Date;
        /**
         * Sets the end date. This is a required field according to the OFX spec.
         *
         * @param end the end date
         */
        setEnd(end: Date): void;
        /**
         * Gets the investment transaction list. This is a heterogenous list of different types of
         * transactions returned in the order the brokerage provides them.
         *
         * @return the investment transaction list
         */
        getInvestmentTransactions(): Array<BaseInvestmentTransaction>;
        /**
         * Sets the investment transaction list. This is a heterogenous list of different types of
         * transactions returned in the order the brokerage provides them.
         *
         * @param transactions the investment transaction list
         */
        setInvestmentTransactions(transactions: Array<BaseInvestmentTransaction>): void;
        /**
         * Gets the bank transaction list.
         *
         * @return the bank transaction list
         */
        getBankTransactions(): Array<InvestmentBankTransaction>;
        /**
         * Sets the bank transaction list.
         *
         * @param bankTransactions the bank transaction list
         */
        setBankTransactions(bankTransactions: Array<InvestmentBankTransaction>): void;
    }
}
declare module ofx4js.domain.data.common {
    enum BalanceRecordType {
        DOLLAR = 0,
        PERCENT = 1,
        NUMBER = 2,
    }
    /**
     * @author Ryan Heaton
     * @see "Section 3.1.3, OFX Spec"
     */
    class BalanceRecord {
        private name;
        private description;
        private type;
        private value;
        private timestamp;
        private currency;
        /**
         * Name of the balance.
         *
         * @return Name of the balance.
         */
        getName(): string;
        /**
         * Name of the balance.
         *
         * @param name Name of the balance.
         */
        setName(name: string): void;
        /**
         * Description of the balance.
         *
         * @return Description of the balance.
         */
        getDescription(): string;
        /**
         * Description of the balance.
         *
         * @param description Description of the balance.
         */
        setDescription(description: string): void;
        /**
         * Type of the balance.
         *
         * @return Type of the balance.
         */
        getType(): BalanceRecordType;
        /**
         * Type of the balance.
         *
         * @param type Type of the balance.
         */
        setType(type: BalanceRecordType): void;
        /**
         * The value of the balance.
         *
         * @return The value of the balance.
         */
        getValue(): string;
        /**
         * The value of the balance.
         *
         * @param value The value of the balance.
         */
        setValue(value: string): void;
        /**
         * Timestamp of the balance.
         *
         * @return Timestamp of the balance.
         */
        getTimestamp(): Date;
        /**
         * Timestamp of the balance.
         *
         * @param timestamp Timestamp of the balance.
         */
        setTimestamp(timestamp: Date): void;
        /**
         * Currency.
         *
         * @return Currency.
         */
        getCurrency(): Currency;
        /**
         * Currency.
         *
         * @param currency Currency.
         */
        setCurrency(currency: Currency): void;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import BalanceRecord = ofx4js.domain.data.common.BalanceRecord;
    /**
     * Aggregate for the investment balance list.
     * @see "Section 13.9.2.7, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BalanceList {
        private balanceRecords;
        /**
         * Gets the list of balance records.
         *
         * @return the list of balance records.
         */
        getBalanceRecords(): Array<BalanceRecord>;
        /**
         * Sets the list of balance records.
         *
         * @param balanceRecords the list of balance records.
         */
        setBalanceRecords(balanceRecords: Array<BalanceRecord>): void;
    }
}
declare module ofx4js.domain.data.investment.statements {
    /**
     * Aggregate for the investment balance.
     * @see "Section 13.9.2.7, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentBalance {
        private availableCash;
        private marginBalance;
        private shortBalance;
        private buyingPower;
        private balanceList;
        /**
         * Gets the available cash balance across all sub-accounts, including sweep funds. This is
         * required field according to the OFX spec.
         *
         * @return the available cash balance
         */
        getAvailableCash(): number;
        /**
         * Sets the available cash balance across all sub-accounts, including sweep funds. This is
         * required field according to the OFX spec.
         *
         * @param availableCash the available cash balance
         */
        setAvailableCash(availableCash: number): void;
        /**
         * Gets the margin account balance. A positive balance indicates a positive cash balance, while
         * a negative balance indicates the customer borrowed funds. This is a required field according
         * to the OFX spec.
         *
         * @return the margin account balance
         */
        getMarginBalance(): number;
        /**
         * Sets the margin account balance. A positive balance indicates a positive cash balance, while
         * a negative balance indicates the customer borrowed funds. This is a required field according
         * to the OFX spec.
         *
         * @param marginBalance the margin account balance
         */
        setMarginBalance(marginBalance: number): void;
        /**
         * Gets the market value of all short positions. This is a positive balance. This is a required
         * field according to the OFX spec.
         *
         * @return the market value of all short positions
         */
        getShortBalance(): number;
        /**
         * Sets the market value of all short positions. This is a positive balance. This is a required
         * field according to the OFX spec.
         *
         * @param shortBalance the market value of all short positions
         */
        setShortBalance(shortBalance: number): void;
        /**
         * Gets the buying power amount. This is an optional field according to the OFX spec.
         *
         * @return the buying power
         */
        getBuyingPower(): number;
        /**
         * Sets the buying power amount. This is an optional field according to the OFX spec.
         *
         * @param buyingPower the buying power
         */
        setBuyingPower(buyingPower: number): void;
        /**
         * Gets the investment balance list. This is an optional field according to the OFX spec.
         *
         * @return the investment balance list
         */
        getBalanceList(): BalanceList;
        /**
         * Sets the investment balance list. This is an optional field according to the OFX spec.
         *
         * @param balanceList the investment balance list
         */
        setBalanceList(balanceList: BalanceList): void;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import StatementResponse = ofx4js.domain.data.common.StatementResponse;
    import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
    import InvestmentPositionList = ofx4js.domain.data.investment.positions.InvestmentPositionList;
    import SecurityList = ofx4js.domain.data.seclist.SecurityList;
    import InvestmentTransactionList = ofx4js.domain.data.investment.transactions.InvestmentTransactionList;
    /**
     * Aggregate for the investment statement download response.
     * @see "Section 13.9.2.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentStatementResponse extends StatementResponse {
        private dateOfStatement;
        private account;
        private investmentTransactionList;
        private positionList;
        private accountBalance;
        private securityList;
        /**
         * Gets the name of the response message.
         *
         * @return the name of the response message
         */
        getResponseMessageName(): string;
        /**
         * Gets the date and time for the statement download. This is a required field according to the
         * OFX spec.
         *
         * @return the date and time for the statement download
         */
        getDateOfStatement(): Date;
        /**
         * Sets the date and time for the statement download. This is a required field according to the
         * OFX spec.
         *
         * @param dateOfStatement the date and time for the statement download
         */
        setDateOfStatement(dateOfStatement: Date): void;
        /**
         * Gets the account for the statement. This is a required field according to the OFX spec.
         *
         * @return the account for the statement
         */
        getAccount(): InvestmentAccountDetails;
        /**
         * Sets the account for the statement. This is a required field according to the OFX spec.
         *
         * @param account the account for the statement
         */
        setAccount(account: InvestmentAccountDetails): void;
        /**
         * Gets the transaction list aggregate. This is an optional field according to the OFX spec.
         *
         * @return the transaction list aggregate
         */
        getInvestmentTransactionList(): InvestmentTransactionList;
        /**
         * Sets the transaction list aggregate. This is an optional field according to the OFX spec.
         *
         * @param transactionList the transaction list aggregate
         */
        setInvestmentTransactionList(transactionList: InvestmentTransactionList): void;
        /**
         * Gets the position list aggreate. This is an optional field according to the OFX spec.
         *
         * @return the position list aggregate
         */
        getPositionList(): InvestmentPositionList;
        /**
         * Sets the position list aggreate. This is an optional field according to the OFX spec.
         *
         * @param positionList the position list aggregate
         */
        setPositionList(positionList: InvestmentPositionList): void;
        /**
         * Gets the account balance. This is an optional field according to the OFX spec.
         *
         * @return the account balance
         */
        getAccountBalance(): InvestmentBalance;
        /**
         * Sets the account balance. This is an optional field according to the OFX spec.
         *
         * @param accountBalance the account balance
         */
        setAccountBalance(accountBalance: InvestmentBalance): void;
        /**
         * Gets the security list aggregate.
         * <br>
         * This is not actually technically part of the investment statement responsr aggregate, but
         * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
         * we provide it here for convenience.
         *
         * @return the security list aggregate
         */
        getSecurityList(): SecurityList;
        /**
         * Sets the security list aggregate.
         * <br>
         * This is not actually technically part of the investment statement responsr aggregate, but
         * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
         * we provide it here for convenience.
         *
         * @param securityList the security list aggregate
         */
        setSecurityList(securityList: SecurityList): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Security request aggregate.
     * @see "Section 13.8.2.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityRequest {
        private securityId;
        private tickerSymbol;
        private fiId;
        getSecurityId(): SecurityId;
        setSecurityId(securityId: SecurityId): void;
        getTickerSymbol(): string;
        setTickerSymbol(tickerSymbol: string): void;
        getFiId(): string;
        setFiId(fiId: string): void;
    }
}
declare module ofx4js.client {
    import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
    import InvestmentStatementResponse = ofx4js.domain.data.investment.statements.InvestmentStatementResponse;
    import SecurityList = ofx4js.domain.data.seclist.SecurityList;
    import SecurityRequest = ofx4js.domain.data.seclist.SecurityRequest;
    /**
     * @author Jon Perlow
     */
    interface InvestmentAccount extends FinancialInstitutionAccount {
        /**
         * Read an account statement.
         *
         * @param start The start date of the statement.
         * @param end The end date of the statement.
         * @throws OFXException if there's an error talking to the brokerage
         * @return The account statement.
         */
        readStatement(start: Date, end: Date): Promise<InvestmentStatementResponse>;
        /**
         * Reads a list of securities from the brokerage
         *
         * @param securities the securities to read
         * @return The security response containing the security infos
         * @throws OFXException if there's an error talking to the brokerage
         */
        readSecurityList(securities: Array<SecurityRequest>): Promise<SecurityList>;
        /**
         * The details of the account.
         *
         * @return The details of the account.
         */
        getDetails(): InvestmentAccountDetails;
    }
}
declare module ofx4js.client {
    import OFXException = ofx4js.OFXException;
    /**
     * @author Ryan Heaton
     */
    class NoOFXResponseException extends OFXException {
        constructor(message?: string);
    }
}
declare module ofx4js.client.context {
    /**
     * The application context.
     *
     * @author Ryan Heaton
     */
    interface OFXApplicationContext {
        /**
         * The current application id.
         *
         * @return The current application id.
         */
        getAppId(): string;
        /**
         * The application version.
         *
         * @return The application version.
         */
        getAppVersion(): string;
    }
}
declare module ofx4js.client.context {
    /**
     * Default application context.
     *
     * @author Ryan Heaton
     */
    class DefaultApplicationContext implements OFXApplicationContext {
        private appId;
        private appVersion;
        constructor(appId: string, appVersion: string);
        getAppId(): string;
        getAppVersion(): string;
    }
}
declare module ofx4js.client.context {
    /**
     * @author Ryan Heaton
     */
    class OFXApplicationContextHolder {
        private static CURRENT_CONTEXT;
        /**
         * Get the current (thread-safe) context.
         *
         * @return The thread-safe context.
         */
        static getCurrentContext(): OFXApplicationContext;
        /**
         * Set the current context.
         *
         * @param context The context.
         */
        static setCurrentContext(context: OFXApplicationContext): void;
    }
}
declare module ofx4js.domain.data {
    /**
     * A message applicable to a request message set.
     *
     * @author Ryan Heaton
     */
    class RequestMessage {
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    class StatementRange {
        private start;
        private end;
        private includeTransactions;
        constructor();
        /**
         * The start of the statement range.
         *
         * @return The start of the statement range.
         */
        getStart(): Date;
        /**
         * The start of the statement range.
         *
         * @param start The start of the statement range.
         */
        setStart(start: Date): void;
        /**
         * The end of the statement range.
         *
         * @return The end of the statement range.
         */
        getEnd(): Date;
        /**
         * The end of the statement range.
         *
         * @param end The end of the statement range.
         */
        setEnd(end: Date): void;
        /**
         * Whether to include transactions.
         *
         * @return Whether to include transactions.
         */
        getIncludeTransactions(): boolean;
        /**
         * Whether to include transactions.
         *
         * @param includeTransactions Whether to include transactions.
         */
        setIncludeTransactions(includeTransactions: boolean): void;
    }
}
declare module ofx4js.domain.data.common {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     */
    class StatementRequest extends RequestMessage {
        private statementRange;
        /**
         * The statement range.
         *
         * @return The statement range.
         */
        getStatementRange(): StatementRange;
        /**
         * The statement range.
         *
         * @param statementRange The statement range.
         */
        setStatementRange(statementRange: StatementRange): void;
    }
}
declare module ofx4js.domain.data {
    /**
     * A message set enclosed in a response envelope.
     *
     * @author Ryan Heaton
     */
    class ResponseMessageSet {
        private version;
        getType(): MessageSetType;
        constructor();
        /**
         * The version of this message set.
         *
         * @return The version of this message set.
         */
        getVersion(): string;
        /**
         * The version of this message set.
         *
         * @param version The version of this message set.
         */
        setVersion(version: string): void;
        /**
         * The list of response messages.
         *
         * @return The list of response messages.
         */
        getResponseMessages(): Array<ResponseMessage>;
        static contentCompare(left: ResponseMessageSet, right: ResponseMessageSet): number;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * A status holder (usually applied to a response).
     *
     * @author Ryan Heaton
     */
    interface StatusHolder {
        /**
         * The name of this status holder (for error reporting).
         *
         * @return The name of this status holder (for error reporting).
         */
        getStatusHolderName(): string;
        /**
         * Get the status.
         *
         * @return The status.
         */
        getStatus(): Status;
    }
    function instanceof_StatusHolder(obj: any): boolean;
}
declare module ofx4js.domain.data {
    import Status = ofx4js.domain.data.common.Status;
    import StatusHolder = ofx4js.domain.data.common.StatusHolder;
    /**
     * A response message wrapped in a transaction.
     *
     * @author Ryan Heaton
     * @see "Section 2.4.6, OFX Spec"
     */
    class TransactionWrappedResponseMessage<M extends ResponseMessage> extends ResponseMessage implements StatusHolder {
        private UID;
        private clientCookie;
        private status;
        /**
         * UID of this transaction.
         *
         * @return UID of this transaction.
         */
        getUID(): string;
        /**
         * UID of this transaction.
         *
         * @param UID UID of this transaction.
         */
        setUID(UID: string): void;
        /**
         * Client cookie (echoed back by the response).
         *
         * @return Client cookie (echoed back by the response).
         */
        getClientCookie(): string;
        /**
         * Client cookie (echoed back by the response).
         *
         * @param clientCookie Client cookie (echoed back by the response).
         */
        setClientCookie(clientCookie: string): void;
        getStatusHolderName(): string;
        getResponseMessageName(): string;
        /**
         * Status of the transaction.
         *
         * @return Status of the transaction.
         */
        getStatus(): Status;
        /**
         * Status of the transaction.
         *
         * @param status Status of the transaction.
         */
        setStatus(status: Status): void;
        /**
         * Get the wrapped message.
         *
         * @return The wrapped message.
         */
        getWrappedMessage(): M;
    }
}
declare module ofx4js.domain.data.banking {
    import StatementResponse = ofx4js.domain.data.common.StatementResponse;
    /**
     * @author Ryan Heaton
     */
    class BankStatementResponse extends StatementResponse {
        private account;
        getResponseMessageName(): string;
        /**
         * The account for the statement.
         *
         * @return The account for the statement.
         */
        getAccount(): BankAccountDetails;
        /**
         * The account for the statement.
         *
         * @param account The account for the statement.
         */
        setAccount(account: BankAccountDetails): void;
    }
}
declare module ofx4js.domain.data.banking {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * @author Ryan Heaton
     */
    class BankStatementResponseTransaction extends TransactionWrappedResponseMessage<BankStatementResponse> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): BankStatementResponse;
        /**
         * The message.
         *
         * @param message The message.
         */
        setMessage(message: BankStatementResponse): void;
        getWrappedMessage(): BankStatementResponse;
    }
}
declare module ofx4js.domain.data.banking {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    /**
     * @author Ryan Heaton
     */
    class BankingResponseMessageSet extends ResponseMessageSet {
        private statementResponses;
        getType(): MessageSetType;
        /**
         * The statement response list.
         *
         * Most OFX files have a single statement response, except MT2OFX
         * which outputs OFX with multiple statement responses
         * in a single banking response message set.
         *
         * @return The statement response list.
         */
        getStatementResponses(): Array<BankStatementResponseTransaction>;
        /**
         * The statement response.
         *
         * @param statementResponses The statement responses.
         */
        setStatementResponses(statementResponses: Array<BankStatementResponseTransaction>): void;
        getResponseMessages(): Array<ResponseMessage>;
        /**
         * The first statement response.
         *
         * @return the first bank statement response.
         * @deprecated Use getStatementResponses() because sometimes there are multiple responses
         */
        getStatementResponse(): BankStatementResponseTransaction;
        setStatementResponse(statementResponse: BankStatementResponseTransaction): void;
    }
}
declare module ofx4js.domain.data.banking {
    import StatementRequest = ofx4js.domain.data.common.StatementRequest;
    /**
     * @author Ryan Heaton
     */
    class BankStatementRequest extends StatementRequest {
        private account;
        /**
         * The account details.
         *
         * @return The account details.
         */
        getAccount(): BankAccountDetails;
        /**
         * The account details.
         *
         * @param account The account details.
         */
        setAccount(account: BankAccountDetails): void;
    }
}
declare module ofx4js.domain.data {
    /**
     * A message set enclosed in an OFX request envelope.
     *
     * @author Ryan Heaton
     */
    class RequestMessageSet {
        private version;
        getType(): MessageSetType;
        constructor();
        /**
         * The version of this request message.
         *
         * @return The version of this request message.
         */
        getVersion(): string;
        /**
         * The version of this request message.
         *
         * @param version The version of this request message.
         */
        setVersion(version: string): void;
        /**
         * The request messages for this request message set.
         *
         * @return The request messages for this request message set.
         */
        getRequestMessages(): Array<RequestMessage>;
        static contentCompare(left: RequestMessageSet, right: RequestMessageSet): number;
    }
}
declare module ofx4js.domain.data {
    /**
     * A request message wrapped in a transaction.
     *
     * @author Ryan Heaton
     * @see "Section 2.4.6, OFX Spec"
     */
    class TransactionWrappedRequestMessage<M extends RequestMessage> extends RequestMessage {
        private UID;
        private clientCookie;
        private transactionAuthorizationNumber;
        constructor(UID?: string);
        /**
         * UID of this transaction.
         *
         * @return UID of this transaction.
         */
        getUID(): string;
        /**
         * UID of this transaction.
         *
         * @param UID UID of this transaction.
         */
        setUID(UID: string): void;
        /**
         * Client cookie (echoed back by the response).
         *
         * @return Client cookie (echoed back by the response).
         */
        getClientCookie(): string;
        /**
         * Client cookie (echoed back by the response).
         *
         * @param clientCookie Client cookie (echoed back by the response).
         */
        setClientCookie(clientCookie: string): void;
        /**
         * The transaction authorization number.
         *
         * @return The transaction authorization number.
         */
        getTransactionAuthorizationNumber(): string;
        /**
         * The transaction authorization number.
         *
         * @param transactionAuthorizationNumber The transaction authorization number.
         */
        setTransactionAuthorizationNumber(transactionAuthorizationNumber: string): void;
        /**
         * Set the wrapped message.
         *
         * @param message The wrapped message.
         */
        setWrappedMessage(message: M): void;
    }
}
declare module ofx4js.domain.data.banking {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * @author Ryan Heaton
     */
    class BankStatementRequestTransaction extends TransactionWrappedRequestMessage<BankStatementRequest> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): BankStatementRequest;
        /**
         * The message.
         *
         * @param message The message.
         *
         */
        setMessage(message: BankStatementRequest): void;
        setWrappedMessage(message: BankStatementRequest): void;
    }
}
declare module ofx4js.domain.data.banking {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     */
    class BankingRequestMessageSet extends RequestMessageSet {
        private statementRequest;
        getType(): MessageSetType;
        /**
         * The statement request.
         *
         * @return The statement request.
         */
        getStatementRequest(): BankStatementRequestTransaction;
        /**
         * The statement request.
         *
         * @param statementRequest The statement request.
         */
        setStatementRequest(statementRequest: BankStatementRequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.client.impl {
    import AccountStatement = ofx4js.client.AccountStatement;
    import FinancialInstitutionAccount = ofx4js.client.FinancialInstitutionAccount;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    import StatementRange = ofx4js.domain.data.common.StatementRange;
    import StatementRequest = ofx4js.domain.data.common.StatementRequest;
    import StatementResponse = ofx4js.domain.data.common.StatementResponse;
    /**
     * Base account implementation. Supports banking and credit card accounts.
     *
     * @author Ryan Heaton
     */
    class BaseAccountImpl<D> implements FinancialInstitutionAccount {
        private details;
        private messageType;
        private username;
        private password;
        private institution;
        constructor(details: D, username: string, password: string, institution: FinancialInstitutionImpl);
        /**
         * Get the message set type of the specified details.
         *
         * @param details The details.
         * @return The message set type.
         */
        protected getMessageSetType(details: D): MessageSetType;
        readStatement(start: Date, end: Date): Promise<AccountStatement>;
        /**
         * Unwrap the statement response from the specified response envelope.
         *
         * @param response The response envelope to unwrap.
         * @return The response.
         */
        protected unwrapStatementResponse(response: ResponseEnvelope): StatementResponse;
        /**
         * Create a request message set from the specified transaction.
         *
         * @param transaction The transaction.
         * @return The request message set.
         */
        protected createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet;
        /**
         * Create a transaction.
         *
         * @return The transaction.
         */
        protected createTransaction(): TransactionWrappedRequestMessage<RequestMessage>;
        /**
         * Create a statement request.
         *
         * @param details The details.
         * @param range the range.
         * @return The statement request.
         */
        protected createStatementRequest(details: D, range: StatementRange): StatementRequest;
        /**
         * The details of this account.
         *
         * @return The details of this account.
         */
        getDetails(): D;
        /**
         * The message set type.
         *
         * @return The message set type.
         */
        protected getMessageType(): MessageSetType;
    }
}
declare module ofx4js.domain.data.signon {
    /**
     * @author Ryan Heaton
     */
    class FinancialInstitution {
        private id;
        private organization;
        /**
         * Financial institution id.
         *
         * @return Financial institution id.
         */
        getId(): string;
        /**
         * Financial institution id.
         *
         * @param id Financial institution id.
         */
        setId(id: string): void;
        /**
         * The organization.
         *
         * @return The organization.
         */
        getOrganization(): string;
        /**
         * The organization.
         *
         * @param organization The organization.
         */
        setOrganization(organization: string): void;
    }
}
declare module ofx4js.domain.data.signon {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * Sign-on request
     *
     * @author Ryan Heaton
     * @see "Section 2.5.1.2, OFX Spec."
     */
    class SignonRequest extends RequestMessage {
        /**
         * @see "Section 2.5.1"
         */
        static ANONYMOUS_USER: string;
        private timestamp;
        private userId;
        private password;
        private userKey;
        private generateUserKey;
        private language;
        private financialInstitution;
        private sessionId;
        private applicationId;
        private applicationVersion;
        private clientUID;
        private additionalCredentials1;
        private additionalCredentials2;
        private authToken;
        private accessKey;
        constructor();
        /**
         * The date and time of the request.
         *
         * @return The date and time of the request.
         */
        getTimestamp(): Date;
        /**
         * The date and time of the request.
         *
         * @param timestamp The date and time of the request.
         */
        setTimestamp(timestamp: Date): void;
        /**
         * The user id.
         *
         * @return The user id.
         */
        getUserId(): string;
        /**
         * The user id.
         *
         * @param userId The user id.
         */
        setUserId(userId: string): void;
        /**
         * The password.
         *
         * @return The password.
         */
        getPassword(): string;
        /**
         * The password.
         *
         * @param password The password.
         */
        setPassword(password: string): void;
        /**
         * The user key provided by the server so as not to require further username/password authentication.
         *
         * @return The user key provided by the server so as not to require further username/password authentication.
         */
        getUserKey(): string;
        /**
         * The user key provided by the server so as not to require further username/password authentication.
         *
         * @param userKey The user key provided by the server so as not to require further username/password authentication.
         */
        setUserKey(userKey: string): void;
        /**
         * Whether to request the server to generate a user key.
         *
         * @return Whether to request the server to generate a user key.
         */
        getGenerateUserKey(): boolean;
        /**
         * Whether to request the server to generate a user key.
         *
         * @param generateUserKey Whether to request the server to generate a user key.
         */
        setGenerateUserKey(generateUserKey: boolean): void;
        /**
         * The three-letter langauge code.
         *
         * @return The three-letter langauge code.
         * @see java.util.Locale#getISO3Language()
         */
        getLanguage(): string;
        /**
         * The three-letter langauge code.
         *
         * @param language The three-letter langauge code.
         */
        setLanguage(language: string): void;
        /**
         * The financial institution.
         *
         * @return The financial institution.
         */
        getFinancialInstitution(): FinancialInstitution;
        /**
         * The financial institution.
         *
         * @param financialInstitution The financial institution.
         */
        setFinancialInstitution(financialInstitution: FinancialInstitution): void;
        /**
         * The server-supplied session id.
         *
         * @return The server-supplied session id.
         */
        getSessionId(): string;
        /**
         * The server-supplied session id.
         *
         * @param sessionId The server-supplied session id.
         */
        setSessionId(sessionId: string): void;
        /**
         * The application id.
         *
         * @return The application id.
         */
        getApplicationId(): string;
        /**
         * The application id.
         *
         * @param applicationId The application id.
         */
        setApplicationId(applicationId: string): void;
        /**
         * The application version.
         *
         * @return The application version.
         */
        getApplicationVersion(): string;
        /**
         * The application version.
         *
         * @param applicationVersion The application version.
         */
        setApplicationVersion(applicationVersion: string): void;
        /**
         * The client-supplied UID.
         *
         * @return The client-supplied UID.
         */
        getClientUID(): string;
        /**
         * The client-supplied UID.
         *
         * @param clientUID The client-supplied UID.
         */
        setClientUID(clientUID: string): void;
        /**
         * Any additional credentials.
         *
         * @return Any additional credentials.
         */
        getAdditionalCredentials1(): string;
        /**
         * Any additional credentials.
         *
         * @param additionalCredentials1 Any additional credentials.
         */
        setAdditionalCredentials1(additionalCredentials1: string): void;
        /**
         * Any additional credentials.
         *
         * @return Any additional credentials.
         */
        getAdditionalCredentials2(): string;
        /**
         * Any additional credentials.
         *
         * @param additionalCredentials2 Any additional credentials.
         */
        setAdditionalCredentials2(additionalCredentials2: string): void;
        /**
         * The authentication token.
         *
         * @return The authentication token.
         */
        getAuthToken(): string;
        /**
         * The authentication token.
         *
         * @param authToken The authentication token.
         */
        setAuthToken(authToken: string): void;
        /**
         * The access key.
         *
         * @return The access key.
         */
        getAccessKey(): string;
        /**
         * The access key.
         *
         * @param accessKey The access key.
         */
        setAccessKey(accessKey: string): void;
    }
}
declare module ofx4js.domain.data.signon {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * Request to change a user password.
     *
     * @author Ryan Heaton
     * @see "Section 2.5.2.1, OFX Spec."
     */
    class PasswordChangeRequest extends RequestMessage {
        private userId;
        private newPassword;
        /**
         * The id of the user changing password.
         *
         * @return The id of the user changing password.
         */
        getUserId(): string;
        /**
         * The id of the user changing password.
         *
         * @param userId The id of the user changing password.
         */
        setUserId(userId: string): void;
        /**
         * The new password.
         *
         * @return The new password.
         */
        getNewPassword(): string;
        /**
         * The new password.
         *
         * @param newPassword The new password.
         */
        setNewPassword(newPassword: string): void;
    }
}
declare module ofx4js.domain.data.signon {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * @author Ryan Heaton
     */
    class PasswordChangeRequestTransaction extends TransactionWrappedRequestMessage<PasswordChangeRequest> {
        private message;
        /**
         * The wrapped message.
         *
         * @return The wrapped message.
         */
        getMessage(): PasswordChangeRequest;
        /**
         * The wrapped message.
         *
         * @param message The wrapped message.
         */
        setMessage(message: PasswordChangeRequest): void;
        setWrappedMessage(message: PasswordChangeRequest): void;
    }
}
declare module ofx4js.domain.data.signon {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * The sign-on request message set.
     *
     * @author Ryan Heaton
     * @see "Section 2.5, OFX Spec."
     */
    class SignonRequestMessageSet extends RequestMessageSet {
        private signonRequest;
        private passwordChangeRequest;
        getType(): MessageSetType;
        /**
         * The message for this message set.
         *
         * @return The message for this message set.
         */
        getSignonRequest(): SignonRequest;
        /**
         * The message for this message set.
         *
         * @param signonRequest The message for this message set.
         */
        setSignonRequest(signonRequest: SignonRequest): void;
        /**
         * The password change request.
         *
         * @return The password change request.
         */
        getPasswordChangeRequest(): PasswordChangeRequestTransaction;
        /**
         * The password change request.
         *
         * @param passwordChangeRequest The password change request.
         */
        setPasswordChangeRequest(passwordChangeRequest: PasswordChangeRequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.signup {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     */
    class AccountInfoRequest extends RequestMessage {
        private lastUpdated;
        constructor();
        /**
         * When the account info was last updated.
         *
         * @return When the account info was last updated.
         */
        getLastUpdated(): Date;
        /**
         * When the account info was last updated.
         *
         * @param lastUpdated When the account info was last updated.
         */
        setLastUpdated(lastUpdated: Date): void;
    }
}
declare module ofx4js.domain.data.signup {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * @author Ryan Heaton
     */
    class AccountInfoRequestTransaction extends TransactionWrappedRequestMessage<AccountInfoRequest> {
        private message;
        /**
         * The wrapped message.
         *
         * @return The wrapped message.
         */
        getMessage(): AccountInfoRequest;
        /**
         * The wrapped message.
         *
         * @param message The wrapped message.
         */
        setMessage(message: AccountInfoRequest): void;
        setWrappedMessage(message: AccountInfoRequest): void;
    }
}
declare module ofx4js.domain.data.signup {
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     */
    class SignupRequestMessageSet extends RequestMessageSet {
        private accountInfoRequest;
        getType(): MessageSetType;
        /**
         * The account info request.
         *
         * @return The account info request.
         */
        getAccountInfoRequest(): AccountInfoRequestTransaction;
        /**
         * The account info request.
         *
         * @param accountInfoRequest The account info request.
         */
        setAccountInfoRequest(accountInfoRequest: AccountInfoRequestTransaction): void;
        /**
         * The request messages.
         *
         * @return The request messages.
         */
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.signup {
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * @author Ryan Heaton
     */
    class AccountInfoResponse extends ResponseMessage {
        private lastUpdated;
        private accounts;
        constructor();
        getResponseMessageName(): string;
        /**
         * When the account info was last updated.
         *
         * @return When the account info was last updated.
         */
        getLastUpdated(): Date;
        /**
         * When the account info was last updated.
         *
         * @param lastUpdated When the account info was last updated.
         */
        setLastUpdated(lastUpdated: Date): void;
        /**
         * The accounts.
         *
         * @return The accounts.
         */
        getAccounts(): Array<AccountProfile>;
        /**
         * The accounts.
         *
         * @param accounts The accounts.
         */
        setAccounts(accounts: Array<AccountProfile>): void;
    }
}
declare module ofx4js.domain.data.signup {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * @author Ryan Heaton
     */
    class AccountInfoResponseTransaction extends TransactionWrappedResponseMessage<AccountInfoResponse> {
        private message;
        /**
         * The wrapped message.
         *
         * @return The wrapped message.
         */
        getMessage(): AccountInfoResponse;
        /**
         * The wrapped message.
         *
         * @param message The wrapped message.
         */
        setMessage(message: AccountInfoResponse): void;
        getWrappedMessage(): AccountInfoResponse;
    }
}
declare module ofx4js.domain.data.signup {
    /**
     * @author Ryan Heaton
     */
    class SignupResponseMessageSet extends ResponseMessageSet {
        private accountInfoResponse;
        getType(): MessageSetType;
        /**
         * The account info response.
         *
         * @return The account info response.
         */
        getAccountInfoResponse(): AccountInfoResponseTransaction;
        /**
         * The account info response.
         *
         * @param accountInfoResponse The account info response.
         */
        setAccountInfoResponse(accountInfoResponse: AccountInfoResponseTransaction): void;
        /**
         * The response messages.
         *
         * @return The response messages.
         */
        getResponseMessages(): Array<ResponseMessage>;
    }
}
declare module ofx4js.domain.data.profile {
    /**
     * @author Ryan Heaton
     * @see "Section 7.1.5, OFX Spec"
     */
    enum ClientRoutingCapability {
        NONE = 0,
        SERVICE = 1,
        MESSAGE_SET = 2,
    }
}
declare module ofx4js.domain.data.profile {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     * @see "Section 7.1.5, OFX Spec"
     */
    class ProfileRequest extends RequestMessage {
        private routingCapability;
        private profileLastUpdated;
        constructor();
        /**
         * The client routing capability.
         *
         * @return The client routing capability.
         */
        getRoutingCapability(): ClientRoutingCapability;
        /**
         * The client routing capability.
         *
         * @param routingCapability The client routing capability.
         */
        setRoutingCapability(routingCapability: ClientRoutingCapability): void;
        /**
         * The date the profile was last updated.
         *
         * @return The date the profile was last updated.
         */
        getProfileLastUpdated(): Date;
        /**
         * The date the profile was last updated.
         *
         * @param profileLastUpdated The date the profile was last updated.
         */
        setProfileLastUpdated(profileLastUpdated: Date): void;
    }
}
declare module ofx4js.domain.data.profile {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * @author Ryan Heaton
     */
    class ProfileRequestTransaction extends TransactionWrappedRequestMessage<ProfileRequest> {
        private message;
        /**
         * The wrapped message.
         *
         * @return The wrapped message.
         */
        getMessage(): ProfileRequest;
        /**
         * The wrapped message.
         *
         * @param message The wrapped message.
         */
        setMessage(message: ProfileRequest): void;
        setWrappedMessage(message: ProfileRequest): void;
    }
}
declare module ofx4js.domain.data.profile {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     * @see "Section 7 OFX Spec"
     */
    class ProfileRequestMessageSet extends RequestMessageSet {
        private profileRequest;
        getType(): MessageSetType;
        /**
         * The profile request.
         *
         * @return The profile request.
         */
        getProfileRequest(): ProfileRequestTransaction;
        /**
         * The profile request.
         *
         * @param profileRequest The profile request.
         */
        setProfileRequest(profileRequest: ProfileRequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.profile {
    import ApplicationSecurity = ofx4js.domain.data.ApplicationSecurity;
    /**
     * Core information about a specific version of a specific message set.
     *
     * @author Ryan Heaton
     * @see "Section 7.2.1, OFX Spec"
     */
    class CoreMessageSetInfo {
        private version;
        private serviceProviderName;
        private url;
        private security;
        private sslRequired;
        private realm;
        private language;
        private syncCapability;
        private fileBasedErrorRecoverySupport;
        private timeout;
        constructor();
        /**
         * Version of the message set.
         *
         * @return The version of the message set.
         */
        getVersion(): string;
        /**
         * The version of the message set.
         *
         * @param version The version of the message set.
         */
        setVersion(version: string): void;
        /**
         * The name of the service provider (sometimes the message set processing is outsourced).
         *
         * @return The name of the service provider (sometimes the message set processing is outsourced).
         */
        getServiceProviderName(): string;
        /**
         * The name of the service provider (sometimes the message set processing is outsourced).
         *
         * @param serviceProviderName The name of the service provider (sometimes the message set processing is outsourced).
         */
        setServiceProviderName(serviceProviderName: string): void;
        /**
         * The URL at which the message set is processed.
         *
         * @return The URL at which the message set is processed.
         */
        getUrl(): string;
        /**
         * The URL at which the message set is processed.
         *
         * @param url The URL at which the message set is processed.
         */
        setUrl(url: string): void;
        /**
         * The application-level security required for this message set.
         *
         * @return The application-level security required for this message set.
         */
        getSecurity(): ApplicationSecurity;
        /**
         * The application-level security required for this message set.
         *
         * @param security The application-level security required for this message set.
         */
        setSecurity(security: ApplicationSecurity): void;
        /**
         * Whether transport-level security is required for this message set.
         *
         * @return Whether transport-level security is required for this message set.
         */
        getSslRequired(): boolean;
        /**
         * Whether transport-level security is required for this message set.
         *
         * @param sslRequired Whether transport-level security is required for this message set.
         */
        setSslRequired(sslRequired: boolean): void;
        /**
         * The sign-on realm.
         *
         * @return The sign-on realm.
         */
        getRealm(): string;
        /**
         * The sign-on realm.
         *
         * @param realm The sign-on realm.
         */
        setRealm(realm: string): void;
        /**
         * The language.
         *
         * @return The language.
         * @see java.util.Locale#getISO3Language()
         */
        getLanguage(): string;
        /**
         * The language.
         *
         * @param language The language.
         */
        setLanguage(language: string): void;
        /**
         * The synchronization capability for this message set.
         *
         * @return The synchronization capability for this message set.
         */
        getSyncCapability(): SynchronizationCapability;
        /**
         * The synchronization capability for this message set.
         *
         * @param syncCapability The synchronization capability for this message set.
         */
        setSyncCapability(syncCapability: SynchronizationCapability): void;
        /**
         * Whether there exists support for resposne-file based error recovery.
         *
         * @return Whether there exists support for resposne-file based error recovery.
         */
        getFileBasedErrorRecoverySupport(): boolean;
        /**
         * Whether there exists support for resposne-file based error recovery.
         *
         * @param fileBasedErrorRecoverySupport Whether there exists support for resposne-file based error recovery.
         */
        setFileBasedErrorRecoverySupport(fileBasedErrorRecoverySupport: boolean): void;
        /**
         * Gets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
         * it. It likely is some type of timeout in seconds.
         *
         * @return the "INTU.TIMEOUT" property
         */
        getIntuTimeout(): number;
        /**
         * Sets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
         * it. It likely is some type of timeout in seconds.
         *
         * @param timeout the "INTU.TIMEOUT" property
         */
        setIntuTimeout(timeout: number): void;
    }
}
declare module ofx4js.domain.data.profile {
    import MessageSetProfile = ofx4js.domain.data.MessageSetProfile;
    import ApplicationSecurity = ofx4js.domain.data.ApplicationSecurity;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * Information specific to a version of a message set.
     *
     * @author Ryan Heaton
     * @see "Section 7.2.1, OFX Spec"
     */
    class VersionSpecificMessageSetInfo implements MessageSetProfile {
        private core;
        /**
         * The information core.
         *
         * @return The information core.
         */
        getCore(): CoreMessageSetInfo;
        /**
         * The information core.
         *
         * @param core The information core.
         */
        setCore(core: CoreMessageSetInfo): void;
        /**
         * The message set type.
         *
         * @return The message set type.
         */
        getMessageSetType(): MessageSetType;
        getVersion(): string;
        getServiceProviderName(): string;
        getUrl(): string;
        getSecurity(): ApplicationSecurity;
        isSslRequired(): boolean;
        getRealm(): string;
        getLanguage(): string;
        getSyncCapability(): SynchronizationCapability;
        hasFileBasedErrorRecoverySupport(): boolean;
    }
}
declare module ofx4js.domain.data.profile {
    /**
     * Information about a message set.
     *
     * @author Ryan Heaton
     * @see "Section 7.2.1, OFX Spec"
     */
    class AbstractMessageSetInfo {
        private versionSpecificInformationList;
        /**
         * List of information about a message set for each version supported.
         *
         * @return List of information about a message set for each version supported.
         */
        getVersionSpecificInformationList(): Array<VersionSpecificMessageSetInfo>;
        /**
         * List of information about a message set for each version supported.
         *
         * @param versionSpecificInformationList List of information about a message set for each version supported.
         */
        setVersionSpecificInformationList(versionSpecificInformationList: Array<VersionSpecificMessageSetInfo>): void;
    }
}
declare module ofx4js.domain.data.profile {
    /**
     * @author Ryan Heaton
     * @see "Section 7.2, OFX Spec"
     */
    class MessageSetInfoList {
        private informationList;
        /**
         * The list of information for each message set.
         *
         * @return The list of information for each message set.
         */
        getInformationList(): Array<AbstractMessageSetInfo>;
        /**
         * The list of information for each message set.
         *
         * @param informationList The list of information for each message set.
         */
        setInformationList(informationList: Array<AbstractMessageSetInfo>): void;
    }
}
declare module ofx4js.domain.data.profile {
    import SignonProfile = ofx4js.domain.data.SignonProfile;
    /**
     * Sign-on information
     *
     * @author Ryan Heaton
     * @see "Section 7.2.2, OFX Spec"
     */
    class SignonInfo implements SignonProfile {
        private realm;
        private minPasswordCharacters;
        private maxPasswordCharacters;
        private passwordCharacterType;
        private passwordCaseSensitive;
        private passwordSpecialCharsAllowed;
        private passwordSpacesAllowed;
        private changePasswordSupported;
        private changePasswordFirstRequired;
        private additionalCredientialsLabel1;
        private additionalCredientialsLabel2;
        private clientUIDRequired;
        private authTokenRequiredForFirstSignon;
        private authTokenLabel;
        private authTokenInfoURL;
        private mfaSupported;
        private mfaChallengeRequiredForFirstSignon;
        constructor();
        /**
         * The name of the sign-on realm.
         *
         * @return The name of the sign-on realm.
         */
        getRealm(): string;
        /**
         * The name of the sign-on realm.
         *
         * @param realm The name of the sign-on realm.
         */
        setRealm(realm: string): void;
        /**
         * The minimum number of password characters.
         *
         * @return The minimum number of password characters.
         */
        getMinPasswordCharacters(): number;
        /**
         * The minimum number of password characters.
         *
         * @param minPasswordCharacters The minimum number of password characters.
         */
        setMinPasswordCharacters(minPasswordCharacters: number): void;
        /**
         * The maximum number of password characters.
         *
         * @return The maximum number of password characters.
         */
        getMaxPasswordCharacters(): number;
        /**
         * The maximum number of password characters.
         *
         * @param maxPasswordCharacters The maximum number of password characters.
         */
        setMaxPasswordCharacters(maxPasswordCharacters: number): void;
        /**
         * The type of password characters supported.
         *
         * @return The type of password characters supported.
         */
        getPasswordCharacterType(): CharacterType;
        /**
         * The type of password characters supported.
         *
         * @param passwordCharacterType The type of password characters supported.
         */
        setPasswordCharacterType(passwordCharacterType: CharacterType): void;
        /**
         * Whether the password is case-sensitive.
         *
         * @return Whether the password is case-sensitive.
         */
        getPasswordCaseSensitive(): boolean;
        /**
         * Whether the password is case-sensitive.
         *
         * @param passwordCaseSensitive Whether the password is case-sensitive.
         */
        setPasswordCaseSensitive(passwordCaseSensitive: boolean): void;
        /**
         * Whether special characters are allowed in the password.
         *
         * @return Whether special characters are allowed in the password.
         */
        getPasswordSpecialCharsAllowed(): boolean;
        /**
         * Whether special characters are allowed in the password.
         *
         * @param passwordSpecialCharsAllowed Whether special characters are allowed in the password.
         */
        setPasswordSpecialCharsAllowed(passwordSpecialCharsAllowed: boolean): void;
        /**
         * Whether spaces are allowed in the password.
         *
         * @return Whether spaces are allowed in the password.
         */
        getPasswordSpacesAllowed(): boolean;
        /**
         * Whether spaces are allowed in the password.
         *
         * @param passwordSpacesAllowed Whether spaces are allowed in the password.
         */
        setPasswordSpacesAllowed(passwordSpacesAllowed: boolean): void;
        /**
         * Whether the server can process a password change request for this realm.
         *
         * @return Whether the server can process a password change request for this realm.
         */
        getChangePasswordSupported(): boolean;
        /**
         * Whether the server can process a password change request for this realm.
         *
         * @param changePasswordSupported Whether the server can process a password change request for this realm.
         */
        setChangePasswordSupported(changePasswordSupported: boolean): void;
        /**
         * Whether the server requires the user to change their password as part of their first signon.
         *
         * @return Whether the server requires the user to change their password as part of their first signon.
         */
        getChangePasswordFirstRequired(): boolean;
        /**
         * Whether the server requires the user to change their password as part of their first signon.
         *
         * @param changePasswordFirstRequired Whether the server requires the user to change their password as part of their first signon.
         */
        setChangePasswordFirstRequired(changePasswordFirstRequired: boolean): void;
        /**
         * Label for a set of additional credentials that the user must supply.
         *
         * @return Label for a set of additional credentials that the user must supply.
         */
        getAdditionalCredientialsLabel1(): string;
        /**
         * Label for a set of additional credentials that the user must supply.
         *
         * @param additionalCredientialsLabel1 Label for a set of additional credentials that the user must supply.
         */
        setAdditionalCredientialsLabel1(additionalCredientialsLabel1: string): void;
        /**
         * Label for a set of additional credentials that the user must supply.
         *
         * @return Label for a set of additional credentials that the user must supply.
         */
        getAdditionalCredientialsLabel2(): string;
        /**
         * Label for a set of additional credentials that the user must supply.
         *
         * @param additionalCredientialsLabel2 Label for a set of additional credentials that the user must supply.
         */
        setAdditionalCredientialsLabel2(additionalCredientialsLabel2: string): void;
        /**
         * Whether a client UID is required for teh sign-on.
         *
         * @return Whether a client UID is required for teh sign-on.
         */
        getClientUIDRequired(): boolean;
        /**
         * Whether a client UID is required for teh sign-on.
         *
         * @param clientUIDRequired Whether a client UID is required for teh sign-on.
         */
        setClientUIDRequired(clientUIDRequired: boolean): void;
        /**
         * Whether an auth token is required for the sign-on.
         *
         * @return Whether an auth token is required for the sign-on.
         */
        getAuthTokenRequiredForFirstSignon(): boolean;
        /**
         * Whether an auth token is required for the sign-on.
         *
         * @param authTokenRequiredForFirstSignon
         *         Whether an auth token is required for the sign-on.
         */
        setAuthTokenRequiredForFirstSignon(authTokenRequiredForFirstSignon: boolean): void;
        /**
         * The label of the auth token.
         *
         * @return The label of the auth token.
         */
        getAuthTokenLabel(): string;
        /**
         * The label of the auth token.
         *
         * @param authTokenLabel The label of the auth token.
         */
        setAuthTokenLabel(authTokenLabel: string): void;
        /**
         * The URL for the auth token information.
         *
         * @return The URL for the auth token information.
         */
        getAuthTokenInfoURL(): string;
        /**
         * The URL for the auth token information.
         *
         * @param authTokenInfoURL The URL for the auth token information.
         */
        setAuthTokenInfoURL(authTokenInfoURL: string): void;
        /**
         * Whether MFA is supported.
         *
         * @return Whether MFA is supported.
         */
        getMfaSupported(): boolean;
        /**
         * Whether MFA is supported.
         *
         * @param mfaSupported Whether MFA is supported.
         */
        setMfaSupported(mfaSupported: boolean): void;
        /**
         * Whether an MFA challenge request is required for the first sign-on into this realm.
         *
         * @return Whether an MFA challenge request is required for the first sign-on into this realm.
         */
        getMfaChallengeRequiredForFirstSignon(): boolean;
        /**
         * Whether an MFA challenge request is required for the first sign-on into this realm.
         *
         * @param mfaChallengeRequiredForFirstSignon
         *         Whether an MFA challenge request is required for the first sign-on into this realm.
         */
        setMfaChallengeRequiredForFirstSignon(mfaChallengeRequiredForFirstSignon: boolean): void;
    }
}
declare module ofx4js.domain.data.profile {
    /**
     * List of signon information.
     *
     * @author Ryan Heaton
     * @see "Section 7.2.2, OFX Spec"
     */
    class SignonInfoList {
        private infoList;
        /**
         * List of sign-on information.
         *
         * @return List of sign-on information.
         */
        getInfoList(): Array<SignonInfo>;
        /**
         * List of sign-on information.
         *
         * @param infoList List of sign-on information.
         */
        setInfoList(infoList: Array<SignonInfo>): void;
    }
}
declare module ofx4js.domain.data.profile {
    import MessageSetProfile = ofx4js.domain.data.MessageSetProfile;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import SignonProfile = ofx4js.domain.data.SignonProfile;
    import FinancialInstitutionProfile = ofx4js.client.FinancialInstitutionProfile;
    /**
     * @author Ryan Heaton
     * @see "Section 7.2 OFX Spec"
     */
    class ProfileResponse extends ResponseMessage implements FinancialInstitutionProfile {
        private messageSetList;
        private signonInfoList;
        private timestamp;
        private financialInstitutionName;
        private address1;
        private address2;
        private address3;
        private city;
        private state;
        private zip;
        private country;
        private customerServicePhone;
        private technicalSupportPhone;
        private fax;
        private siteURL;
        private email;
        /**
         * List of message set information.
         * @return List of message set information.
         */
        getMessageSetList(): MessageSetInfoList;
        /**
         * List of message set information.
         *
         * @param messageSetList List of message set information.
         */
        setMessageSetList(messageSetList: MessageSetInfoList): void;
        /**
         * List of signon information.
         *
         * @return List of signon information.
         */
        getSignonInfoList(): SignonInfoList;
        /**
         * List of signon information.
         *
         * @param signonInfoList List of signon information.
         */
        setSignonInfoList(signonInfoList: SignonInfoList): void;
        getResponseMessageName(): string;
        getLastUpdated(): Date;
        /**
         * The timestamp of this profile update.
         *
         * @return The timestamp of this profile update.
         */
        getTimestamp(): Date;
        /**
         * The timestamp of this profile update.
         *
         * @param timestamp The timestamp of this profile update.
         */
        setTimestamp(timestamp: Date): void;
        /**
         * The name of the financial institution.
         *
         * @return The name of the financial institution.
         */
        getFinancialInstitutionName(): string;
        /**
         * The name of the financial institution.
         *
         * @param financialInstitutionName The name of the financial institution.
         */
        setFinancialInstitutionName(financialInstitutionName: string): void;
        /**
         * The address of the financial institution.
         *
         * @return The address of the financial institution.
         */
        getAddress1(): string;
        /**
         * The address of the financial institution.
         *
         * @param address1 The address of the financial institution.
         */
        setAddress1(address1: string): void;
        /**
         * The address of the financial institution.
         *
         * @return The address of the financial institution.
         */
        getAddress2(): string;
        /**
         * The address of the financial institution.
         *
         * @param address2 The address of the financial institution.
         */
        setAddress2(address2: string): void;
        /**
         * The address of the financial institution.
         *
         * @return The address of the financial institution.
         */
        getAddress3(): string;
        /**
         * The address of the financial institution.
         *
         * @param address3 The address of the financial institution.
         */
        setAddress3(address3: string): void;
        /**
         * The city of the financial institution.
         *
         * @return The city of the financial institution.
         */
        getCity(): string;
        /**
         * The city of the financial institution.
         *
         * @param city The city of the financial institution.
         */
        setCity(city: string): void;
        /**
         * The state of this financial institution.
         *
         * @return The state of this financial institution.
         */
        getState(): string;
        /**
         * The state of this financial institution.
         *
         * @param state The state of this financial institution.
         */
        setState(state: string): void;
        /**
         * The postal code of this financial institution.
         *
         * @return The postal code of this financial institution.
         */
        getZip(): string;
        /**
         * The postal code of this financial institution.
         *
         * @param zip The postal code of this financial institution.
         */
        setZip(zip: string): void;
        /**
         * The country code for this financial institution.
         *
         * @return The country code for this financial institution.
         * @see java.util.Locale#getISO3Country()
         */
        getCountry(): string;
        /**
         * The country code for this financial institution.
         *
         * @param country The country code for this financial institution.
         */
        setCountry(country: string): void;
        /**
         * The phone number to customer service.
         *
         * @return The phone number to customer service.
         */
        getCustomerServicePhone(): string;
        /**
         * The phone number to customer service.
         *
         * @param customerServicePhone The phone number to customer service.
         */
        setCustomerServicePhone(customerServicePhone: string): void;
        /**
         * The phone number to tech support.
         *
         * @return The phone number to tech support.
         */
        getTechnicalSupportPhone(): string;
        /**
         * The phone number to tech support.
         *
         * @param technicalSupportPhone The phone number to tech support.
         */
        setTechnicalSupportPhone(technicalSupportPhone: string): void;
        /**
         * The fax number.
         *
         * @return The fax number.
         */
        getFax(): string;
        /**
         * The fax number.
         *
         * @param fax The fax number.
         */
        setFax(fax: string): void;
        /**
         * URL for the financial institution.
         *
         * @return URL for the financial institution.
         */
        getSiteURL(): string;
        /**
         * URL for the financial institution.
         *
         * @param siteURL URL for the financial institution.
         */
        setSiteURL(siteURL: string): void;
        /**
         * The email for this FI
         *
         * @return The email for this FI
         */
        getEmail(): string;
        /**
         * The email for this FI
         *
         * @param email The email for this FI
         */
        setEmail(email: string): void;
        getMessageSetProfile(type: MessageSetType, version?: string): MessageSetProfile;
        getMessageSetProfile_noversion(type: MessageSetType): MessageSetProfile;
        /**
         * Get all the profiles of the specified type.
         *
         * @param type The type.
         * @return The profiles.
         */
        protected getProfiles(type: MessageSetType): Array<MessageSetProfile>;
        getMessageSetProfile_version(type: MessageSetType, version: string): MessageSetProfile;
        getSignonProfile(messageSet: MessageSetProfile): SignonProfile;
    }
}
declare module ofx4js.domain.data.profile {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * @author Ryan Heaton
     */
    class ProfileResponseTransaction extends TransactionWrappedResponseMessage<ProfileResponse> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): ProfileResponse;
        /**
         * The message.
         *
         * @param message The message.
         */
        setMessage(message: ProfileResponse): void;
        getWrappedMessage(): ProfileResponse;
    }
}
declare module ofx4js.domain.data.profile {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * @author Ryan Heaton
     * @see "Section 7 OFX Spec"
     */
    class ProfileResponseMessageSet extends ResponseMessageSet {
        private profileResponse;
        getType(): MessageSetType;
        /**
         * The profile response.
         *
         * @return The profile response.
         */
        getProfileResponse(): ProfileResponseTransaction;
        /**
         * The profile response.
         *
         * @param profileResponse The profile response.
         */
        setProfileResponse(profileResponse: ProfileResponseTransaction): void;
        getResponseMessages(): Array<ResponseMessage>;
    }
}
declare module ofx4js.meta {
    function Header_add<Type>(clazz: any, params: HeaderParams<Type>): void;
}
declare module ofx4js.domain.data {
    import SortedSet = ofx4js.collections.SortedSet;
    /**
     * Envelope for enclosing an OFX request.
     *
     * @author Ryan Heaton
     * @see "Section 2.4.3, OFX Spec"
     */
    class RequestEnvelope {
        private security;
        private UID;
        private lastProcessedUID;
        private messageSets;
        constructor(UID?: string);
        /**
         * The security of this envelope.
         *
         * @return The security of this envelope.
         * @see "Section 2.2, OFX spec"
         */
        getSecurity(): ApplicationSecurity;
        /**
         * The security of this envelope.
         *
         * @param security The security of this envelope.
         * @see "Section 2.2, OFX spec"
         */
        setSecurity(security: ApplicationSecurity): void;
        /**
         * The UID for the envelope.
         *
         * @return The UID for the envelope.
         * @see "Section 2.2, OFX spec"
         */
        getUID(): string;
        /**
         * The UID for the envelope.
         *
         * @param UID The UID for the envelope.
         * @see "Section 2.2, OFX spec"
         */
        setUID(UID: string): void;
        /**
         * The UID of the last-processed request/response (used for file-based error recovery).
         *
         * @return The UID of the last-processed request/response (used for file-based error recovery).
         * @see "Section 2.2, OFX spec"
         */
        getLastProcessedUID(): string;
        /**
         * The UID of the last-processed request/response (used for file-based error recovery).
         *
         * @param lastProcessedUID The UID of the last-processed request/response (used for file-based error recovery).
         * @see "Section 2.2, OFX spec"
         */
        setLastProcessedUID(lastProcessedUID: string): void;
        /**
         * The message sets that make up the content of this request.
         *
         * @return The message sets that make up the content of this request.
         * @see "Section 2.4.5, OFX Spec"
         */
        getMessageSets(): SortedSet<RequestMessageSet>;
        /**
         * The message sets that make up the content of this request.
         *
         * @param messageSets The message sets that make up the content of this request.
         * @see "Section 2.4.5, OFX Spec"
         */
        setMessageSets(messageSets: SortedSet<RequestMessageSet>): void;
    }
}
declare module ofx4js.domain.data.signon {
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * Response to a change a user password request.
     *
     * @author Ryan Heaton
     * @see "Section 2.5.2.2, OFX Spec."
     */
    class PasswordChangeResponse extends ResponseMessage {
        private userId;
        private changeTimestamp;
        /**
         * The id of the user changing password.
         *
         * @return The id of the user changing password.
         */
        getUserId(): string;
        getResponseMessageName(): string;
        /**
         * The id of the user changing password.
         *
         * @param userId The id of the user changing password.
         */
        setUserId(userId: string): void;
        /**
         * The timestamp of the password change.
         *
         * @return The timestamp of the password change.
         */
        getChangeTimestamp(): Date;
        /**
         * The timestamp of the password change.
         *
         * @param changeTimestamp The timestamp of the password change.
         */
        setChangeTimestamp(changeTimestamp: Date): void;
    }
}
declare module ofx4js.domain.data.signon {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * @author Ryan Heaton
     */
    class PasswordChangeResponseTransaction extends TransactionWrappedResponseMessage<PasswordChangeResponse> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): PasswordChangeResponse;
        /**
         * The message.
         *
         * @param message The message.
         */
        setMessage(message: PasswordChangeResponse): void;
        getWrappedMessage(): PasswordChangeResponse;
    }
}
declare module ofx4js.domain.data.signon {
    import Status = ofx4js.domain.data.common.Status;
    import StatusHolder = ofx4js.domain.data.common.StatusHolder;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * The signon response message.
     *
     * @author Ryan Heaton
     * @see "Section 2.5.1.2, OFX Spec."
     */
    class SignonResponse extends ResponseMessage implements StatusHolder {
        private status;
        private timestamp;
        private userKey;
        private userKeyExpiration;
        private language;
        private profileLastUpdated;
        private accountLastUpdated;
        private financialInstitution;
        private sessionId;
        private accessKey;
        constructor();
        getResponseMessageName(): string;
        getStatusHolderName(): string;
        /**
         * The signon response status.
         *
         * @return The signon response status.
         */
        getStatus(): Status;
        /**
         * The signon response status.
         *
         * @param status The signon response status.
         */
        setStatus(status: Status): void;
        /**
         * The timestamp of this response.
         *
         * @return The timestamp of this response.
         */
        getTimestamp(): Date;
        /**
         * The timestamp of this response.
         *
         * @param timestamp The timestamp of this response.
         */
        setTimestamp(timestamp: Date): void;
        /**
         * The userkey that can be used instead of the username/password.
         *
         * @return The userkey that can be used instead of the username/password.
         */
        getUserKey(): string;
        /**
         * The userkey that can be used instead of the username/password.
         *
         * @param userKey The userkey that can be used instead of the username/password.
         */
        setUserKey(userKey: string): void;
        /**
         * The date/time of the expiration of the user key.
         *
         * @return The date/time of the expiration of the user key.
         */
        getUserKeyExpiration(): Date;
        /**
         * The date/time of the expiration of the user key.
         *
         * @param userKeyExpiration The date/time of the expiration of the user key.
         */
        setUserKeyExpiration(userKeyExpiration: Date): void;
        /**
         * The three-letter langauge code.
         *
         * @return The three-letter langauge code.
         * @see java.util.Locale#getISO3Language()
         */
        getLanguage(): string;
        /**
         * The three-letter langauge code.
         *
         * @param language The three-letter langauge code.
         */
        setLanguage(language: string): void;
        /**
         * The date/time that the FI profile was last updated.
         *
         * @return The date/time that the FI profile was last updated.
         */
        getProfileLastUpdated(): Date;
        /**
         * The date/time that the FI profile was last updated.
         *
         * @param profileLastUpdated The date/time that the FI profile was last updated.
         */
        setProfileLastUpdated(profileLastUpdated: Date): void;
        /**
         * The date/time that the user's account information was updated.
         *
         * @return The date/time that the user's account information was updated.
         */
        getAccountLastUpdated(): Date;
        /**
         * The date/time that the user's account information was updated.
         *
         * @param accountLastUpdated The date/time that the user's account information was updated.
         */
        setAccountLastUpdated(accountLastUpdated: Date): void;
        /**
         * The financial instutution identity information.
         *
         * @return The financial instutution identity information.
         */
        getFinancialInstitution(): FinancialInstitution;
        /**
         * The financial instutution identity information.
         *
         * @param financialInstitution The financial instutution identity information.
         */
        setFinancialInstitution(financialInstitution: FinancialInstitution): void;
        /**
         * The session id for the client.
         *
         * @return The session id for the client.
         */
        getSessionId(): string;
        /**
         * The session id for the client.
         *
         * @param sessionId The session id for the client.
         */
        setSessionId(sessionId: string): void;
        /**
         * The access key that the client should return in the next sign-on requuest.
         *
         * @return The access key that the client should return in the next sign-on requuest.
         */
        getAccessKey(): string;
        /**
         * The access key that the client should return in the next sign-on requuest.
         *
         * @param accessKey The access key that the client should return in the next sign-on requuest.
         */
        setAccessKey(accessKey: string): void;
    }
}
declare module ofx4js.domain.data.signon {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * The sign-on response message set.
     *
     * @author Ryan Heaton
     * @see "Section 2.5, OFX Spec."
     */
    class SignonResponseMessageSet extends ResponseMessageSet {
        private signonResponse;
        private passwordChangeResponse;
        getType(): MessageSetType;
        /**
         * The message for this message set.
         *
         * @return The message for this message set.
         */
        getSignonResponse(): SignonResponse;
        /**
         * The message for this message set.
         *
         * @param signonResponse The message for this message set.
         */
        setSignonResponse(signonResponse: SignonResponse): void;
        /**
         * The password change response.
         *
         * @return The password change response.
         */
        getPasswordChangeResponse(): PasswordChangeResponseTransaction;
        /**
         * The password change response.
         *
         * @param passwordChangeResponse The password change response.
         */
        setPasswordChangeResponse(passwordChangeResponse: PasswordChangeResponseTransaction): void;
        getResponseMessages(): Array<ResponseMessage>;
    }
}
declare module ofx4js.domain.data {
    import SortedSet = ofx4js.collections.SortedSet;
    import SignonResponse = ofx4js.domain.data.signon.SignonResponse;
    /**
     * Envelope for enclosing an OFX response.
     *
     * @author Ryan Heaton
     * @see "Section 2.4.3, OFX Spec"
     */
    class ResponseEnvelope {
        private security;
        private UID;
        private messageSets;
        /**
         * The security of this envelope.
         *
         * @return The security of this envelope.
         * @see "Section 2.2, OFX spec"
         */
        getSecurity(): ApplicationSecurity;
        /**
         * The security of this envelope.
         *
         * @param security The security of this envelope.
         * @see "Section 2.2, OFX spec"
         */
        setSecurity(security: ApplicationSecurity): void;
        /**
         * The UID for the envelope.
         *
         * @return The UID for the envelope.
         * @see "Section 2.2, OFX spec"
         */
        getUID(): string;
        /**
         * The UID for the envelope.
         *
         * @param UID The UID for the envelope.
         * @see "Section 2.2, OFX spec"
         */
        setUID(UID: string): void;
        /**
         * The message sets that make up the content of this response.
         *
         * @return The message sets that make up the content of this response.
         * @see "Section 2.4.5, OFX Spec"
         */
        getMessageSets(): SortedSet<ResponseMessageSet>;
        /**
         * The message sets that make up the content of this response.
         *
         * @param messageSets The message sets that make up the content of this response.
         * @see "Section 2.4.5, OFX Spec"
         */
        setMessageSets(messageSets: SortedSet<ResponseMessageSet>): void;
        /**
         * Helper method for looking up the signon response.
         *
         * @return The signon response, or null if none found.
         */
        getSignonResponse(): SignonResponse;
        /**
         * Get the message set of the specified type.
         *
         * @param type The type.
         * @return The message set, or null.
         */
        getMessageSet(type: MessageSetType): ResponseMessageSet;
    }
}
declare module ofx4js.client.net {
    import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
    import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
    /**
     * Connection to an OFX interface.
     *
     * @author Ryan Heaton
     */
    interface OFXConnection {
        /**
         * Send a request.
         *
         * @param request The request to send.
         * @param url The URL to which to send the request.
         * @return The response.
         */
        sendRequest(request: RequestEnvelope, url: string): Promise<ResponseEnvelope>;
    }
}
declare module ofx4js.client.net {
    import OFXException = ofx4js.OFXException;
    /**
     * Error with a particular OFX connection.
     *
     * @author Ryan Heaton
     */
    class OFXConnectionException extends OFXException {
        constructor(message: string, e?: Error);
    }
}
declare module ofx4js.domain.data.investment.statements {
    /**
     * Aggreate to indicate whether position information is requested as part of the statement
     * @see "Section 13.9.1.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class IncludePosition {
        private sentDownDate;
        private includePositions;
        constructor();
        /**
         * Gets the date that the position should be sent down for. This is an optional field according
         * to the OFX spec.
         *
         * @return the date for the position
         */
        getDateSentDown(): Date;
        /**
         * Sets the date that the position should be sent down for. This is an optional field according
         * to the OFX spec.
         *
         * @param sentDownDate the date for the position
         */
        setDateSentDown(sentDownDate: Date): void;
        /**
         * Gets whether to include positions in the statement download.
         *
         * @return whether to include positions in the statement download
         */
        getIncludePositions(): boolean;
        /**
         * Sets whether to include positions in the statement download.
         *
         * @param includePositions whether to include positions in the statement download
         */
        setIncludePositions(includePositions: boolean): void;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import StatementRequest = ofx4js.domain.data.common.StatementRequest;
    import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
    /**
     * Aggregate for the investment statement download request.
     * @see "Section 13.9.1.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentStatementRequest extends StatementRequest {
        private account;
        private includeOpenOrders;
        private includePosition;
        private includeBalance;
        constructor();
        /**
         * The account details.
         *
         * @return The account details.
         */
        getAccount(): InvestmentAccountDetails;
        /**
         * The account details.
         *
         * @param account The account details.
         */
        setAccount(account: InvestmentAccountDetails): void;
        /**
         * Gets whether to include open orders. This is an optional field according to the OFX spec.
         * <br>
         * Note, open orders are not yet implemented.
         *
         * @return whether to include open orders
         */
        getIncludeOpenOrders(): boolean;
        /**
         * Sets whether to include open orders. This is an optional field according to the OFX spec.
         * <br>
         * Note, open orders are not yet implemented.
         *
         * @param includeOpenOrders whether to include open orders
         */
        setIncludeOpenOrders(includeOpenOrders: boolean): void;
        /**
         * Gets the include position child aggregate. This is a required field according to the OFX spec.
         *
         * @return the include position child aggregate
         */
        getIncludePosition(): IncludePosition;
        /**
         * Gets the include position child aggregate. This is a required field according to the OFX spec.
         *
         * @param includePosition the include position child aggregate
         */
        setIncludePosition(includePosition: IncludePosition): void;
        /**
         * Gets whether to include balance info in the response. This is a required field according to
         * the OFX spec.
         *
         * @return whether to include balance info in the response
         */
        getIncludeBalance(): boolean;
        /**
         * Sets whether to include balance info in the response. This is a required field according to
         * the OFX spec.
         *
         * @param includeBalance whether to include balance info in the response
         */
        setIncludeBalance(includeBalance: boolean): void;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * Investment statement transaction request.
     * @see "Section 13.9.1.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentStatementRequestTransaction extends TransactionWrappedRequestMessage<InvestmentStatementRequest> {
        private message;
        /**
         * Gets the the statement request message.
         *
         * @return the statement request message.
         */
        getMessage(): InvestmentStatementRequest;
        /**
         * Sets the the statement request message.
         *
         * @param message the statement request message.
         */
        setMessage(message: InvestmentStatementRequest): void;
        setWrappedMessage(message: InvestmentStatementRequest): void;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    /**
     * Investment statement request message set.
     * @see "Section 13.7.1.2.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentStatementRequestMessageSet extends RequestMessageSet {
        private statementRequest;
        getType(): MessageSetType;
        /**
         * Gets the statement request.
         *
         * @return the request
         */
        getStatementRequest(): InvestmentStatementRequestTransaction;
        /**
         * Sets the statement request.
         *
         * @param statementRequest the request
         */
        setStatementRequest(statementRequest: InvestmentStatementRequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * Investment statement transaction response.
     * @see "Section 13.9.2.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentStatementResponseTransaction extends TransactionWrappedResponseMessage<InvestmentStatementResponse> {
        private message;
        /**
         * Gets the the statement response message.
         *
         * @return the statement response message.
         */
        getMessage(): InvestmentStatementResponse;
        /**
         * Sets the the statement response message.
         *
         * @param message the statement response message.
         */
        setMessage(message: InvestmentStatementResponse): void;
        getWrappedMessage(): InvestmentStatementResponse;
    }
}
declare module ofx4js.domain.data.investment.statements {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    /**
     * Investment statement response message set.
     * @see "Section 13.7.1.2.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentStatementResponseMessageSet extends ResponseMessageSet {
        private statementResponses;
        getType(): MessageSetType;
        /**
         * Gets the statement response list. Most OFX files have a single statement response.
         *
         * @return the statement response list
         */
        getStatementResponses(): Array<InvestmentStatementResponseTransaction>;
        /**
         * Sets the statement reponse list. Most OFX files have a single statement response.
         *
         * @param statementResponses the statement response list
         */
        setStatementResponses(statementResponses: Array<InvestmentStatementResponseTransaction>): void;
        /**
         * Gets the first statement response. Use getStatementResponses() if you are expecting multiple
         * responses.
         *
         * @return the first investment statement response.
         */
        getStatementResponse(): InvestmentStatementResponseTransaction;
        /**
         * Sets the statement response if there is a single response.
         *
         * @param statementResponse The statement response.
         */
        setStatementResponse(statementResponse: InvestmentStatementResponseTransaction): void;
        getResponseMessages(): Array<ResponseMessage>;
    }
}
declare module ofx4js.domain.data.seclist {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * Request aggregate for the security list.
     * @see "Section 13.8.2.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityListRequest extends RequestMessage {
        private securityRequests;
        getSecurityRequests(): Array<SecurityRequest>;
        setSecurityRequests(securityRequests: Array<SecurityRequest>): void;
    }
}
declare module ofx4js.domain.data.seclist {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * Security list transaction request.
     * @see "Section 13.8.2.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityListRequestTransaction extends TransactionWrappedRequestMessage<SecurityListRequest> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): SecurityListRequest;
        /**
         * The message.
         *
         * @param message The message.
         *
         */
        setMessage(message: SecurityListRequest): void;
        setWrappedMessage(message: SecurityListRequest): void;
    }
}
declare module ofx4js.domain.data.seclist {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    /**
     * Security list request message set.
     * @see "Section 13.7.2.2.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityListRequestMessageSet extends RequestMessageSet {
        private securityListRequest;
        getType(): MessageSetType;
        /**
         * Gets the security list request.
         *
         * @return the request
         */
        getSecurityListRequest(): SecurityListRequestTransaction;
        /**
         * Sets the security list request.
         *
         * @param statementRequest the request
         */
        setSecurityListRequest(statementRequest: SecurityListRequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.seclist {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * Security list transaction response.
     * @see "Section 13.8.3.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SecurityListResponseTransaction extends TransactionWrappedResponseMessage<SecurityListResponse> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): SecurityListResponse;
        /**
         * The message.
         *
         * @param message The message.
         */
        setMessage(message: SecurityListResponse): void;
        getWrappedMessage(): SecurityListResponse;
    }
}
declare module ofx4js.domain.data.seclist {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    /**
     * @author Jon Perlow
     */
    class SecurityListResponseMessageSet extends ResponseMessageSet {
        private securityListResponse;
        private securityList;
        getType(): MessageSetType;
        /**
         * The security list response list transaction.
         *
         * Most OFX files have a single security response.
         *
         * @return The security list response list.
         */
        getSecurityListResponse(): SecurityListResponseTransaction;
        /**
         * The security list response.
         *
         * @param securityListResponse The security list response.
         */
        setSecurityListResponse(securityListResponse: SecurityListResponseTransaction): void;
        getSecurityList(): SecurityList;
        setSecurityList(securityList: SecurityList): void;
        getResponseMessages(): Array<ResponseMessage>;
    }
}
declare module ofx4js.client.impl {
    import InvestmentAccount = ofx4js.client.InvestmentAccount;
    import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
    import InvestmentStatementResponse = ofx4js.domain.data.investment.statements.InvestmentStatementResponse;
    import SecurityRequest = ofx4js.domain.data.seclist.SecurityRequest;
    import SecurityList = ofx4js.domain.data.seclist.SecurityList;
    /**
     * @author Jon Perlow
     */
    class InvestmentAccountImpl implements InvestmentAccount {
        private details;
        private username;
        private password;
        private institution;
        constructor(details: InvestmentAccountDetails, username: string, password: string, institution: FinancialInstitutionImpl);
        readStatement(start: Date, end: Date): Promise<InvestmentStatementResponse>;
        readSecurityList(securities: Array<SecurityRequest>): Promise<SecurityList>;
        /**
         * The details of this account.
         *
         * @return The details of this account.
         */
        getDetails(): InvestmentAccountDetails;
        private unwrapStatementResponse(response);
        private createStatementRequestMessageSet(transaction);
        private createStatementRequest(details, range);
        private createSecurityListRequestMessageSet(transaction);
        private createSecurityListRequest(securities);
        private unwrapSecurityList(response);
    }
}
declare module ofx4js.client.impl {
    import AccountProfile = ofx4js.domain.data.signup.AccountProfile;
    import AccountInfoRequest = ofx4js.domain.data.signup.AccountInfoRequest;
    import AccountInfoRequestTransaction = ofx4js.domain.data.signup.AccountInfoRequestTransaction;
    import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
    import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
    import ProfileRequest = ofx4js.domain.data.profile.ProfileRequest;
    import ProfileRequestTransaction = ofx4js.domain.data.profile.ProfileRequestTransaction;
    import InvestmentAccount = ofx4js.client.InvestmentAccount;
    import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
    import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
    import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
    import StatusHolder = ofx4js.domain.data.common.StatusHolder;
    import SignonRequest = ofx4js.domain.data.signon.SignonRequest;
    import OFXConnection = ofx4js.client.net.OFXConnection;
    import BankAccount = ofx4js.client.BankAccount;
    /**
     * Base implementation for the financial institution.
     *
     * @author Ryan Heaton
     */
    class FinancialInstitutionImpl implements FinancialInstitution {
        private connection;
        private data;
        constructor(data: FinancialInstitutionData, connection: OFXConnection);
        readProfile(): Promise<FinancialInstitutionProfile>;
        readAccountProfiles(username: string, password: string): Promise<Array<AccountProfile>>;
        loadBankAccount(details: BankAccountDetails, username: string, password: string): BankAccount;
        loadCreditCardAccount(details: CreditCardAccountDetails, username: string, password: string): CreditCardAccount;
        loadInvestmentAccount(details: InvestmentAccountDetails, username: string, password: string): InvestmentAccount;
        /**
         * Create an authenticated request envelope.
         *
         * @param username The username.
         * @param password The password.
         * @return The request envelope.
         */
        createAuthenticatedRequest(username: string, password: string): RequestEnvelope;
        /**
         * Send a request to a specific URL.
         *
         * @param request The request.
         * @param url The url.
         * @return The request.
         */
        sendRequest(request: RequestEnvelope, url?: string): Promise<ResponseEnvelope>;
        /**
         * Open the specified response envelope and look for the profile.
         *
         * @param response The response envelope.
         * @return The profile.
         */
        protected getProfile(response: ResponseEnvelope): FinancialInstitutionProfile;
        /**
         * General validation checks on the specified response.
         *
         * @param request The request.
         * @param response Their response.
         * @throws OFXException Upon invalid response.
         */
        doGeneralValidationChecks(request: RequestEnvelope, response: ResponseEnvelope): void;
        /**
         * Validate the status of the given status holder.
         *
         * @param statusHolder The status holder.
         */
        protected validateStatus(statusHolder: StatusHolder): void;
        /**
         * Create a transaction message for a profile request.
         *
         * @return The transaction message.
         */
        protected createProfileTransaction(): ProfileRequestTransaction;
        /**
         * Create a profile request.
         *
         * @return The profile request.
         */
        protected createProfileRequest(): ProfileRequest;
        /**
         * Create a sign-on request for the specified user.
         *
         * @param username The username.
         * @param password The password.
         * @return The signon request.
         */
        protected createSignonRequest(username: string, password: string): SignonRequest;
        /**
         * Create a transaction for an account info request.
         *
         * @return The transaction.
         */
        protected createAccountInfoTransaction(): AccountInfoRequestTransaction;
        /**
         * Create an account info request.
         *
         * @return The account info request.
         */
        protected createAccountInfoRequest(): AccountInfoRequest;
        /**
         * Get the account profiles for the specified response envelope.
         *
         * @param response The response envelope.
         * @return The account profiles.
         */
        protected getAccountProfiles(response: ResponseEnvelope): Array<AccountProfile>;
        /**
         * The connection used by this implementation.
         *
         * @return The connection used by this implementation.
         */
        getConnection(): OFXConnection;
        /**
         * The financial institution data.
         *
         * @return The financial institution data.
         */
        getData(): FinancialInstitutionData;
    }
}
declare module ofx4js.client.impl {
    import StatementResponse = ofx4js.domain.data.common.StatementResponse;
    import StatementRequest = ofx4js.domain.data.common.StatementRequest;
    import StatementRange = ofx4js.domain.data.common.StatementRange;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
    import BankAccount = ofx4js.client.BankAccount;
    /**
     * @author Ryan Heaton
     */
    class BankingAccountImpl extends BaseAccountImpl<BankAccountDetails> implements BankAccount {
        constructor(details: BankAccountDetails, username: string, password: string, institution: FinancialInstitutionImpl);
        protected unwrapStatementResponse(response: ResponseEnvelope): StatementResponse;
        protected createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet;
        protected createTransaction(): TransactionWrappedRequestMessage<RequestMessage>;
        protected createStatementRequest(details: BankAccountDetails, range: StatementRange): StatementRequest;
    }
}
declare module ofx4js.client.impl {
    import FinancialInstitutionData = ofx4js.client.FinancialInstitutionData;
    /**
     * Base bean for FI data.
     *
     * @author Ryan Heaton
     */
    class BaseFinancialInstitutionData implements FinancialInstitutionData {
        private id;
        private fid;
        private name;
        private organization;
        private ofxUrl;
        private brokerId;
        constructor(id?: string);
        getId(): string;
        setId(id: string): void;
        getFinancialInstitutionId(): string;
        setFinancialInstitutionId(id: string): void;
        getName(): string;
        setName(name: string): void;
        getOrganization(): string;
        setOrganization(organization: string): void;
        getOFXURL(): string;
        setOFXURL(OFXURL: string): void;
        getBrokerId(): string;
        setBrokerId(brokerId: string): void;
    }
}
declare module ofx4js.domain.data.creditcard {
    import StatementRequest = ofx4js.domain.data.common.StatementRequest;
    /**
     * @author Ryan Heaton
     */
    class CreditCardStatementRequest extends StatementRequest {
        private account;
        /**
         * The account details.
         *
         * @return The account details.
         */
        getAccount(): CreditCardAccountDetails;
        /**
         * The account details.
         *
         * @param account The account details.
         */
        setAccount(account: CreditCardAccountDetails): void;
    }
}
declare module ofx4js.domain.data.creditcard {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * @author Ryan Heaton
     */
    class CreditCardStatementRequestTransaction extends TransactionWrappedRequestMessage<CreditCardStatementRequest> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): CreditCardStatementRequest;
        /**
         * The message.
         *
         * @param message The message.
         *
         */
        setMessage(message: CreditCardStatementRequest): void;
        setWrappedMessage(message: CreditCardStatementRequest): void;
    }
}
declare module ofx4js.domain.data.creditcard {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Ryan Heaton
     */
    class CreditCardRequestMessageSet extends RequestMessageSet {
        private statementRequest;
        getType(): MessageSetType;
        /**
         * The request.
         *
         * @return The request.
         */
        getStatementRequest(): CreditCardStatementRequestTransaction;
        /**
         * The request.
         *
         * @param statementRequest The request.
         */
        setStatementRequest(statementRequest: CreditCardStatementRequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.creditcard {
    import StatementResponse = ofx4js.domain.data.common.StatementResponse;
    /**
     * @author Ryan Heaton
     */
    class CreditCardStatementResponse extends StatementResponse {
        private account;
        getResponseMessageName(): string;
        /**
         * The account for the statement.
         *
         * @return The account for the statement.
         */
        getAccount(): CreditCardAccountDetails;
        /**
         * The account for the statement.
         *
         * @param account The account for the statement.
         */
        setAccount(account: CreditCardAccountDetails): void;
    }
}
declare module ofx4js.domain.data.creditcard {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * @author Ryan Heaton
     */
    class CreditCardStatementResponseTransaction extends TransactionWrappedResponseMessage<CreditCardStatementResponse> {
        private message;
        /**
         * The message.
         *
         * @return The message.
         */
        getMessage(): CreditCardStatementResponse;
        /**
         * The message.
         *
         * @param message The message.
         */
        setMessage(message: CreditCardStatementResponse): void;
        getWrappedMessage(): CreditCardStatementResponse;
    }
}
declare module ofx4js.domain.data.creditcard {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    /**
     * @author Ryan Heaton
     */
    class CreditCardResponseMessageSet extends ResponseMessageSet {
        private statementResponses;
        getType(): MessageSetType;
        /**
         * The statement response list.
         *
         * Most OFX files have a single statement response, except MT2OFX
         * which outputs OFX with multiple statement responses
         * in a single banking response message set.
         *
         * @return The statement response list.
         */
        getStatementResponses(): Array<CreditCardStatementResponseTransaction>;
        /**
         * The statement reponse list.
         *
         * @param statementResponses The statement response list.
         */
        setStatementResponses(statementResponses: Array<CreditCardStatementResponseTransaction>): void;
        /**
         * The first statement response.
         *
         * @return the first bank statement response.
         * @deprecated Use getStatementResponses() because sometimes there are multiple responses
         */
        getStatementResponse(): CreditCardStatementResponseTransaction;
        /**
         * The statement response.
         *
         * @param statementResponse The statement response.
         */
        setStatementResponse(statementResponse: CreditCardStatementResponseTransaction): void;
        getResponseMessages(): Array<ResponseMessage>;
    }
}
declare module ofx4js.client.impl {
    import StatementResponse = ofx4js.domain.data.common.StatementResponse;
    import StatementRequest = ofx4js.domain.data.common.StatementRequest;
    import StatementRange = ofx4js.domain.data.common.StatementRange;
    import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
    import CreditCardAccount = ofx4js.client.CreditCardAccount;
    /**
     * @author Ryan Heaton
     */
    class CreditCardAccountImpl extends BaseAccountImpl<CreditCardAccountDetails> implements CreditCardAccount {
        constructor(details: CreditCardAccountDetails, username: string, password: string, institution: FinancialInstitutionImpl);
        protected unwrapStatementResponse(response: ResponseEnvelope): StatementResponse;
        protected createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet;
        protected createTransaction(): TransactionWrappedRequestMessage<RequestMessage>;
        protected createStatementRequest(details: CreditCardAccountDetails, range: StatementRange): StatementRequest;
    }
}
declare module ofx4js.client.net {
    /**
     * @author Ryan Heaton
     */
    class OFXServerException extends OFXConnectionException {
        private httpCode;
        constructor(message: string, httpCode: number);
        getHttpCode(): number;
    }
}
declare module ofx4js.io {
    /**
     * @author Ryan Heaton
     */
    class OFXParseException extends ofx4js.OFXException {
        constructor(message: string);
    }
}
declare module ofx4js.io {
    /**
     * @author Ryan Heaton
     */
    interface OFXWriter {
        /**
         * Write the specified headers.
         *
         * @param headers The headers to be written.
         */
        writeHeaders(headers: StringMap): void;
        /**
         * Write the start of a new aggregate.
         *
         * @param aggregateName The aggregate name.
         */
        writeStartAggregate(aggregateName: string): void;
        /**
         * Write an element to the current aggregate.
         *
         * @param name The name of the element.
         * @param value The value of the element.
         */
        writeElement(name: string, value: string): void;
        /**
         * Write the end of an aggregate.
         *
         * @param aggregateName The aggregate name.
         * @throws IllegalArgumentException If the specified aggregate hasn't been started.
         */
        writeEndAggregate(aggregateName: string): void;
        /**
         * Close this OFX writer.
         */
        close(): void;
    }
}
declare module ofx4js.io {
    /**
     * Interface for converting to/from OFX strings.
     *
     * @author Ryan Heaton
     */
    interface StringConversion {
        /**
         * Convert the specified object to a string.
         *
         * @param value The value to convert to a string.
         * @return The string.
         */
        toString(value: Object): string;
        /**
         * Convert the specified value to an object of the specified type.
         *
         * @param clazz The class.
         * @param value The value.
         * @return The converted value.
         * @throws OFXSyntaxException If there was something wrong with the syntax of the string.
         */
        fromString<E>(clazz: any, value: string): E;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * Holder for an unknown status code.
     *
     * @author Ryan Heaton
     */
    class UnknownStatusCode extends StatusCode {
        private code;
        private message;
        private defaultSeverity;
        constructor(code: number, message: string, defaultSeverity: Severity);
        getCode(): number;
        getMessage(): string;
        getDefaultSeverity(): Severity;
        toString(): string;
    }
}
declare module ofx4js.io {
    /**
     * Utility class for conversion to/from OFX strings.
     *
     * @author Ryan Heaton
     */
    class DefaultStringConversion implements StringConversion {
        toString(value: Object): string;
        fromString<E>(clazz: any, value: string): E;
        /**
         * Parses a date according to OFX.
         *
         * @param value The value of the date.
         * @return The date value.
         */
        protected parseDate(value: string): Date;
        /**
         * Format the date according to the OFX spec.
         *
         * @param date The date.
         * @return The date format.
         */
        protected formatDate(date: Date): string;
        /**
         * Pad a number with leading zeroes until it is of <tt>size</tt> length
         *
         * @param num number
         * @param size number of digits in final number
         * @return padded number
         */
        private pad(num, size);
        /**
         * Pad a number with trailing zeroes until it is of <tt>size</tt> length.
         * Intended for numbers after a decimal point to get a fixed number of decimals
         *
         * @param num number
         * @param size number of digits in final number
         * @return padded number
         */
        private dpad(num, size);
    }
}
declare module ofx4js.io {
    import SortedSet = ofx4js.collections.SortedSet;
    /**
     * Marshaller for aggregate objects.
     *
     * @author Ryan Heaton
     */
    class AggregateMarshaller {
        private conversion;
        constructor();
        /**
         * Marshal the specified aggregate object.
         *
         * @param aggregate The aggregate to marshal.
         * @param writer    The writer.
         */
        marshal(aggregate: Object, writer: OFXWriter): void;
        /**
         * Write the aggregate attributes for the specified aggregate.
         *
         * @param aggregate           The aggregate.
         * @param writer              The writer.
         * @param aggregateAttributes The aggregate attributes.
         */
        protected writeAggregateAttributes(aggregate: Object, writer: OFXWriter, aggregateAttributes: SortedSet<AggregateAttribute>): void;
        /**
         * The conversion.
         *
         * @return The conversion.
         */
        getConversion(): StringConversion;
        /**
         * The conversion.
         *
         * @param conversion The conversion.
         */
        setConversion(conversion: StringConversion): void;
    }
}
declare module ofx4js.collections {
    class Stack<T> {
        private values;
        constructor();
        push(...values: Array<T>): void;
        pop(): T;
        peek(): T;
        isEmpty(): boolean;
    }
}
declare module ofx4js.io {
    /**
     * Handler for events during OFX parsing.
     *
     * @author Ryan Heaton
     */
    interface OFXHandler {
        /**
         * Handler an OFX header.
         *
         * @param name The name of the header.
         * @param value The value of the header.
         */
        onHeader(name: string, value: string): void;
        /**
         * Handle a new OFX element.
         *
         * @param name The name of the element.
         * @param value The value of the element.
         */
        onElement(name: string, value: string): void;
        /**
         * Handle the start of a new OFX aggregate.
         *
         * @param aggregateName The name of the aggregate.
         */
        startAggregate(aggregateName: string): void;
        /**
         * Handle the end of an OFX aggregate.
         *
         * @param aggregateName The aggregate name.
         */
        endAggregate(aggregateName: string): void;
    }
}
declare module ofx4js.io {
    /**
     * @author Ryan Heaton
     */
    class OFXSyntaxException extends OFXParseException {
        constructor(message: string);
    }
}
declare module ofx4js.io {
    /**
     * Content handler that manages the aggregate using a stack-based implementation.
     *
     * @author Ryan Heaton
     */
    class AggregateStackContentHandler<A> implements OFXHandler {
        private stack;
        private conversion;
        private parsingRoot;
        constructor(root: A, conversion: StringConversion);
        onHeader(name: string, value: string): void;
        onElement(name: string, value: string): void;
        startAggregate(aggregateName: string): void;
        endAggregate(aggregateName: string): void;
    }
}
declare module ofx4js.io {
    class StringReader {
        private _text;
        private _cursor;
        private _mark;
        constructor(text: string);
        read(cbuf?: Array<string>, offset?: number, length?: number): number | string;
        readChar(): string;
        close(): void;
        mark(): void;
        reset(): void;
        remainder(): string;
    }
}
declare module ofx4js.io {
    /**
     * Basic interface for reading an OFX document.
     *
     * @author Ryan Heaton
     */
    interface OFXReader {
        /**
         * Set the handler for this OFX reader.
         *
         * @param handler The handler.
         */
        setContentHandler(handler: OFXHandler): void;
        /**
         * Parse a stream or reader.
         *
         * @param stream The stream or reader to parse.
         */
        parse(stream: StringReader): void;
    }
}
declare module ofx4js.io {
    /**
     * Default (no-op) implementation of an OFX handler.
     *
     * @author Ryan Heaton
     */
    class DefaultHandler implements OFXHandler {
        onHeader(name: string, value: string): void;
        onElement(name: string, value: string): void;
        startAggregate(aggregateName: string): void;
        endAggregate(aggregateName: string): void;
    }
}
declare module ofx4js.io {
    enum OFXParseEventType {
        CHARACTERS = 0,
        ELEMENT = 1,
    }
    /**
     * An event during OFX parsing.
     *
     * @author Ryan Heaton
     */
    class OFXParseEvent {
        private eventType;
        private eventValue;
        constructor(eventType: OFXParseEventType, eventValue: string);
        getEventType(): OFXParseEventType;
        getEventValue(): string;
    }
}
declare module ofx4js.io {
    /**
     * @author Ryan Heaton
     */
    class OFXV2ContentHandler {
        private eventStack;
        private ofxHandler;
        private startedEvents;
        constructor(ofxHandler: OFXHandler);
        install(parser: SAXParser): void;
        onopentag(node: SAXTag): void;
        /**
         * Whether the specified element aggregate has already been started.
         *
         * @param event The event containing the start.
         * @return Whether the specified element aggregate has already been started.
         */
        protected isAlreadyStarted(event: OFXParseEvent): boolean;
        onclosetag(qName: string): void;
        ontext(value: string): void;
    }
}
declare module ofx4js.io {
    /**
     * Base class for an OFX reader.  Parses the headers and determines whether we're parsing an
     * OFX v2 or OFX v1 element.  For OFX v2, uses a standard SAX library.
     *
     * @author Ryan Heaton
     */
    class BaseOFXReader implements OFXReader {
        static OFX_2_PROCESSING_INSTRUCTION_PATTERN: RegExp;
        private contentHandler;
        constructor();
        /**
         * The content handler.
         *
         * @return The content handler.
         */
        getContentHandler(): OFXHandler;
        /**
         * The content handler.
         *
         * @param handler The content handler.
         */
        setContentHandler(handler: OFXHandler): void;
        /**
         * Parse the reader, including the headers.
         *
         * @param reader The reader.
         */
        parse(reader: StringReader): void;
        /**
         * The first characters of the first OFX element, '<', 'O', 'F', 'X'
         *
         * @return The first characters of the OFX element.
         */
        protected getFirstElementStart(): Array<string>;
        /**
         * Whether the specified buffer contains the specified character.
         *
         * @param buffer The buffer.
         * @param c The character to search for.
         * @return Whether the specified buffer contains the specified character.
         */
        private contains(buffer, c);
        private shiftAndAppend(buffer, c);
        /**
         * Parse an OFX version 1 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
         *
         * @param text The text.
         */
        protected parseV1FromFirstElement(text: string): void;
        /**
         * Parse an OFX version 2 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
         *
         * @param text The text.
         */
        protected parseV2FromFirstElement(text: string): void;
        /**
         * Process the given characters as OFX version 1 headers.
         *
         * @param chars The characters to process.
         */
        protected processOFXv1Headers(chars: string): void;
        /**
         * Process the given characters as OFX version 2 headers.
         *
         * @param chars The characters to process.
         */
        protected processOFXv2Headers(chars: string): void;
    }
}
declare module ofx4js.io {
    /**
     * Unmarshaller for aggregate objects.
     *
     * @author Ryan Heaton
     */
    class AggregateUnmarshaller<A> {
        private clazz;
        private conversion;
        constructor(clazz: any);
        unmarshal(arg: StringReader | string): A;
        /**
         * New OFX reader.
         *
         * @return new OFX reader.
         */
        protected newReader(): OFXReader;
        /**
         * The conversion.
         *
         * @return The conversion.
         */
        getConversion(): StringConversion;
        /**
         * The conversion.
         *
         * @param conversion The conversion.
         */
        setConversion(conversion: StringConversion): void;
    }
}
declare module ofx4js.io {
    class OutputBuffer {
        private data;
        constructor();
        toString(encoding?: string): string;
        append(data: string): void;
        size(): number;
    }
    class StreamWriter {
        private out;
        private encoding;
        constructor(out: OutputBuffer, encoding: string);
        flush(): void;
        close(): void;
        write(data: string): void;
    }
}
declare module ofx4js.io.v1 {
    import OFXWriter = ofx4js.io.OFXWriter;
    /**
     * OFX writer to SGML, suitable for OFX versions < 2.0.
     *
     * @author Ryan Heaton
     */
    class OFXV1Writer implements OFXWriter {
        private LINE_SEPARATOR;
        protected headersWritten: boolean;
        protected writer: StreamWriter;
        private writeAttributesOnNewLine;
        constructor(out: OutputBuffer | StreamWriter);
        protected newWriter(out: OutputBuffer): StreamWriter;
        writeHeaders(headers: StringMap): void;
        writeStartAggregate(aggregateName: string): void;
        writeElement(name: string, value: string): void;
        writeEndAggregate(aggregateName: string): void;
        isWriteAttributesOnNewLine(): boolean;
        setWriteAttributesOnNewLine(writeAttributesOnNewLine: boolean): void;
        close(): void;
        flush(): void;
        println(line?: string): void;
        print(line: string): void;
    }
}
declare module ofx4js.client.net {
    import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
    import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
    import OFXWriter = ofx4js.io.OFXWriter;
    import AggregateMarshaller = ofx4js.io.AggregateMarshaller;
    import AggregateUnmarshaller = ofx4js.io.AggregateUnmarshaller;
    import OutputBuffer = ofx4js.io.OutputBuffer;
    /**
     * Base implementation for an OFX connection.
     *
     * @author Ryan Heaton
     */
    class OFXV1Connection implements OFXConnection {
        private async;
        private marshaller;
        private unmarshaller;
        constructor();
        sendRequest(request: RequestEnvelope, url: string): Promise<ResponseEnvelope>;
        /**
         * Log a request buffer.
         *
         * @param outBuffer The buffer to log.
         */
        protected logRequest(outBuffer: OutputBuffer): void;
        protected logResponse(inBuffer: string): void;
        /**
         * Send the specified buffer to the specified URL.
         *
         * @param url The URL.
         * @param outBuffer The buffer.
         * @return a promise that resolves with the response.
         */
        protected sendBuffer(url: string, outBuffer: OutputBuffer): Promise<string>;
        /**
         * Unmarshal the input stream.
         *
         * @param in The input stream.
         * @return The response envelope.
         */
        protected unmarshal(in_: string): ResponseEnvelope;
        /**
         * Create a new OFX writer.
         *
         * @param out The output stream for the writer.
         * @return The OFX writer.
         */
        protected newOFXWriter(out: OutputBuffer): OFXWriter;
        /**
         * The marshaller.
         *
         * @return The marshaller.
         */
        getMarshaller(): AggregateMarshaller;
        /**
         * The marshaller.
         *
         * @param marshaller The marshaller.
         */
        setMarshaller(marshaller: AggregateMarshaller): void;
        /**
         * The unmarshaller.
         *
         * @return The unmarshaller.
         */
        getUnmarshaller(): AggregateUnmarshaller<ResponseEnvelope>;
        /**
         * The unmarshaller.
         *
         * @param unmarshaller The unmarshaller.
         */
        setUnmarshaller(unmarshaller: AggregateUnmarshaller<ResponseEnvelope>): void;
        /**
         * Async mode
         *
         * @return {bool} Whether in async mode.
         */
        getAsync(): boolean;
        /**
         * Async mode
         *
         * @param {bool} async async mode.
         */
        setAsync(async: boolean): void;
    }
}
declare module ofx4js.io.v2 {
    import OFXV1Writer = ofx4js.io.v1.OFXV1Writer;
    /**
     * OFX writer to XML, suitable for OFX version 2.0.
     *
     * @author Ryan Heaton
     */
    class OFXV2Writer extends OFXV1Writer {
        constructor(out: OutputBuffer | StreamWriter);
        protected newWriter(out: OutputBuffer): StreamWriter;
        writeHeaders(headers: StringMap): void;
        writeElement(name: string, value: string): void;
        isWriteAttributesOnNewLine(): boolean;
    }
}
declare module ofx4js.client.net {
    import OFXWriter = ofx4js.io.OFXWriter;
    import OutputBuffer = ofx4js.io.OutputBuffer;
    /**
     * @author Ryan Heaton
     */
    class OFXV2Connection extends OFXV1Connection {
        protected newOFXWriter(out: OutputBuffer): OFXWriter;
    }
}
/**
 * Support for "bill pay" features of the OFX spec.
 */
declare module ofx4js.domain.data.billpay {
}
declare module ofx4js.domain.data.common {
    /**
     * Day of week used in "PROCDAYSOFF" lists.
     *
     * @author Scott Priddy
     * @see "OFX Spec, Section 13.6.2"
     */
    enum ProcessorDayOff {
        MONDAY = 0,
        TUESDAY = 1,
        WEDNESDAY = 2,
        THURSDAY = 3,
        FRIDAY = 4,
        SATURDAY = 5,
        SUNDAY = 6,
    }
    function ProcessorDayOff_fromOfx(ofxVal: string): ProcessorDayOff;
}
declare module ofx4js.domain.data.common {
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class T1099Request extends RequestMessage {
    }
}
declare module ofx4js.domain.data.common {
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class T1099Response extends ResponseMessage {
    }
}
declare module ofx4js.domain.data.common {
    import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
    import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
    /**
     * @author Ryan Heaton
     */
    class TransferInfo {
        private bankAccountFrom;
        private creditCardAccountFrom;
        private bankAccountTo;
        private creditCardAccountTo;
        private amount;
        private due;
        /**
         * The bank account to transfer from.
         *
         * @return The bank account to transfer from.
         */
        getBankAccountFrom(): BankAccountDetails;
        /**
         * The bank account to transfer from.
         *
         * @param bankAccountFrom The bank account to transfer from.
         */
        setBankAccountFrom(bankAccountFrom: BankAccountDetails): void;
        /**
         * The account to transfer from.
         *
         * @param acct The account to transfer from.
         */
        setAccountFrom(acct: BankAccountDetails | CreditCardAccountDetails): void;
        /**
         * The credit card to transfer from.
         *
         * @return The credit card to transfer from.
         */
        getCreditCardAccountFrom(): CreditCardAccountDetails;
        /**
         * The credit card to transfer from.
         *
         * @param creditCardAccountFrom The credit card to transfer from.
         */
        setCreditCardAccountFrom(creditCardAccountFrom: CreditCardAccountDetails): void;
        /**
         * The bank account to transfer to.
         *
         * @return The bank account to transfer to.
         */
        getBankAccountTo(): BankAccountDetails;
        /**
         * The bank account to transfer to.
         *
         * @param bankAccountTo The bank account to transfer to.
         */
        setBankAccountTo(bankAccountTo: BankAccountDetails): void;
        /**
         * The bank or credit card account to transfer to.
         *
         * @param accountTo The account to transfer to.
         */
        setAccountTo(accountTo: BankAccountDetails | CreditCardAccountDetails): void;
        /**
         * The credit card account to transfer to.
         *
         * @return The credit card account to transfer to.
         */
        getCreditCardAccountTo(): CreditCardAccountDetails;
        /**
         * The credit card account to transfer to.
         *
         * @param creditCardAccountTo The credit card account to transfer to.
         */
        setCreditCardAccountTo(creditCardAccountTo: CreditCardAccountDetails): void;
        /**
         * The amount.
         *
         * @return The amount.
         */
        getAmount(): number;
        /**
         * The amount.
         *
         * @param amount The amount.
         */
        setAmount(amount: number): void;
        /**
         * The due date.
         *
         * @return The due date.
         */
        getDue(): Date;
        /**
         * The due date.
         *
         * @param due The due date.
         */
        setDue(due: Date): void;
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    enum TransferStatusEvent {
        WILLPROCESSON = 0,
        POSTEDON = 1,
        NOFUNDSON = 2,
        CANCELEDON = 3,
        FAILEDON = 4,
    }
}
declare module ofx4js.domain.data.common {
    /**
     * @author Ryan Heaton
     */
    class TransferStatus {
        private event;
        private date;
        /**
         * The event.
         *
         * @return The event.
         */
        getEvent(): TransferStatusEvent;
        /**
         * The event.
         *
         * @param event The event.
         */
        setEvent(event: TransferStatusEvent): void;
        /**
         * The date of the event.
         *
         * @return The date of the event.
         */
        getDate(): Date;
        /**
         * The date of the event.
         *
         * @param date The date of the event.
         */
        setDate(date: Date): void;
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Represents a debt position.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class DebtPosition extends BasePosition {
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Represents a mutual fund position.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class MutualFundPosition extends BasePosition {
        private unitsStreet;
        private unitsUser;
        private reinvestDividends;
        private reinvestCapitalGains;
        /**
         * Gets the number of units in the financial insititution's street name.
         *
         * @return the number of units in the financial insititution's street name.
         */
        getUnitsStreet(): number;
        /**
         * Sets the number of units in the financial insititution's street name.
         *
         * @param unitsStreet the number of units in the financial insititution's street name.
         */
        setUnitsStreet(unitsStreet: number): void;
        /**
         * Gets the number of units in the user's name.
         *
         * @return the number of units in the user's name.
         */
        getUnitsUser(): number;
        /**
         * Sets the number of units in the user's name.
         *
         * @param unitsUser the number of units in the user's name.
         */
        setUnitsUser(unitsUser: number): void;
        /**
         * Gets whether dividends are automatically reinvested.
         *
         * @return whether dividends are automatically reinvested
         */
        getReinvestDividends(): boolean;
        /**
         * Sets whether dividends are automatically reinvested.
         *
         * @param reinvestDividends whether dividends are automatically reinvested
         */
        setReinvestDividends(reinvestDividends: boolean): void;
        /**
         * Gets whether capital gains are automatically reinvested.
         *
         * @return whether capital gains are automatically reinvested
         */
        getReinvestCapitalGains(): boolean;
        /**
         * Sets whether capital gains are automatically reinvested.
         *
         * @param reinvestCapitalGains whether capital gains are automatically reinvested
         */
        setReinvestCapitalGains(reinvestCapitalGains: boolean): void;
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * How a short option is secured.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum ShortOptionSecurity {
        NAKED = 0,
        COVERED = 1,
    }
    function ShortOptionSecurity_fromOfx(ofxVal: string): ShortOptionSecurity;
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Represents an options position.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class OptionsPosition extends BasePosition {
        private secured;
        /**
         * Gets how the options position is secured (for short positions).
         *
         * @return how the options position is secured
         */
        getSecured(): string;
        /**
         * Sets how the options position is secured (for short positions).
         *
         * @param secured how the options position is secured
         */
        setSecured(secured: string): void;
        /**
         * Gets how the options position is secured as a well-known type.
         *
         * @return how the option position is secured or null if it's not a well-known type
         */
        getSecuredEnum(): ShortOptionSecurity;
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Represents other types of positions.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class OtherPosition extends BasePosition {
    }
}
declare module ofx4js.domain.data.investment.positions {
    /**
     * Represents a stock position.
     * @see "Section 13.9.2.6.1, OFX Spec"
     *
     * @author Jon Perlow
     */
    class StockPosition extends BasePosition {
        private unitsStreet;
        private unitsUser;
        private reinvestDividends;
        /**
         * Gets the number of units in the financial insititution's street name.
         *
         * @return the number of units in the financial insititution's street name.
         */
        getUnitsStreet(): number;
        /**
         * Sets the number of units in the financial insititution's street name.
         *
         * @param unitsStreet the number of units in the financial insititution's street name.
         */
        setUnitsStreet(unitsStreet: number): void;
        /**
         * Gets the number of units in the user's name.
         *
         * @return the number of units in the user's name.
         */
        getUnitsUser(): number;
        /**
         * Sets the number of units in the user's name.
         *
         * @param unitsUser the number of units in the user's name.
         */
        setUnitsUser(unitsUser: number): void;
        /**
         * Gets whether dividends are automatically reinvested.
         *
         * @return whether dividends are automatically reinvested
         */
        getReinvestDividends(): boolean;
        /**
         * Sets whether dividends are automatically reinvested.
         *
         * @param reinvestDividends whether dividends are automatically reinvested
         */
        setReinvestDividends(reinvestDividends: boolean): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Interface for transactions that have a security associated with them.
     *
     * @author Jon Perlow
     */
    interface TransactionWithSecurity {
        /**
         * Gets the security for the transaction.
         *
         * @return the security id for the transaction
         */
        getSecurityId(): SecurityId;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Original currency aggregate ("ORIGCURRENCY"). For investment transactions in other currencies,
     * the financial institution can report the transaction as converted into the default currency
     * and then include this child aggregate to report what the original currency was and what the
     * rate of conversion was.
     * @see "Section 5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class OriginalCurrency {
        private currencyRate;
        private currencyCode;
        /**
         * Gets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
         * the transaction response) to "CURSYM" (the original currency code below).
         *
         * @return the currency rate
         */
        getCurrencyRate(): number;
        /**
         * Sets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
         * the transaction response) to "CURSYM" (the original currency code below).
         *
         * @param currencyRate the currency rate
         */
        setCurrencyRate(currencyRate: number): void;
        /**
         * Gets the ISO-4217 3-letter currency identifier of the original currency.
         * @see java.util.Currency#getCurrencyCode()
         *
         * @return the currency code
         */
        getCurrencyCode(): string;
        /**
         * Sets the ISO-4217 3-letter currency identifier of the original currency.
         * @see java.util.Currency#getCurrencyCode()
         *
         * @param currencyCode the currency code
         */
        setCurrencyCode(currencyCode: string): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Buy investment transaction aggregate ("INVBUY").
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BuyInvestmentTransaction {
        private investmentTransaction;
        private securityId;
        private units;
        private unitPrice;
        private markup;
        private commission;
        private taxes;
        private fees;
        private load;
        private total;
        private currencyCode;
        private originalCurrencyInfo;
        private subAccountSecurity;
        private subAccountFund;
        /**
         * Gets the investment transaction child aggregate.
         *
         * @return the investment transaction child aggregate
         */
        getInvestmentTransaction(): InvestmentTransaction;
        /**
         * Sets the investment transaction child aggregate.
         *
         * @param investmentTransaction the investment transaction child aggregate
         */
        setInvestmentTransaction(investmentTransaction: InvestmentTransaction): void;
        /**
         * Gets the id of the security that was bought. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was bought
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that was bought. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security that was bought
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the number of units of the security that was bought. For security-based actions other
         * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the number of units purchased.
         */
        getUnits(): number;
        /**
         * Sets the number of units of the security that was bought. For security-based actions other
         * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param units the number of units purchased.
         */
        setUnits(units: number): void;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param unitPrice the per unit price
         */
        setUnitPrice(unitPrice: number): void;
        /**
         * Gets the portion of the unit price that is attributed to the dealer markup. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit markeup price
         */
        getMarkup(): number;
        /**
         * Sets the portion of the unit price that is attributed to the dealer markup. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param markup the per unit markeup price
         */
        setMarkup(markup: number): void;
        /**
         * Gets the transaction commission for the purchase. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction commision
         */
        getCommission(): number;
        /**
         * Sets the transaction commission for the purchase. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param commission the transaction commision
         */
        setCommission(commission: number): void;
        /**
         * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction taxes
         */
        getTaxes(): number;
        /**
         * Sets the taxes for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param taxes the transaction taxes
         */
        setTaxes(taxes: number): void;
        /**
         * Gets the fees for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction fees
         */
        getFees(): number;
        /**
         * Sets the fees for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param fees the transaction fees
         */
        setFees(fees: number): void;
        /**
         * Gets the load for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the load
         */
        getLoad(): number;
        /**
         * Sets the load for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param load the load
         */
        setLoad(load: number): void;
        /**
         * Gets the total for the purchase. Should be equal to
         * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
         * spec. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total for the purchase. Should be equal to
         * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
         * spec. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction.
         */
        getCurrencyCode(): string;
        /**
         * Sets the currency code for the transaction. Only one of currency code or original currency
         * info may be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction.
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrencyInfo the original currency info for the transaction
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
          * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
          * @see "Section 13.9.2.4.3, OFX Spec"
          *
          * @return the sub account type
          */
        getSubAccountSecurity(): string;
        /**
          * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
          * @see "Section 13.9.2.4.3, OFX Spec"
          *
          * @param subAccountSecurity the sub account type
          */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAcctFund the sub account fund
         */
        setSubAccountFund(subAcctFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type or null if it wasn't one of the well known types.
         */
        getSubAccountFundEnum(): SubAccountType;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Base class for all investment transactions for buying securities.
     * <br>
     * This class exposes a read-only view of the flattened aggregates that are
     * common to all buy investment transactions as a convenience to application
     * developers who may not find the ofx aggregation model intuitive.
     *
     * @author Jon Perlow
     */
    class BaseBuyInvestmentTransaction extends BaseInvestmentTransaction implements TransactionWithSecurity {
        private buyInvestment;
        constructor(transactionType: TransactionType);
        /**
         * Gets the buy investment transaction child aggregate.
         *
         * @return the buy investment transaction child aggregate
         */
        getBuyInvestment(): BuyInvestmentTransaction;
        /**
         * Sets the buy investment transaction child aggregate.
         *
         * @param buyInvestment the buy investment transaction child aggregate
         */
        setBuyInvestment(buyInvestment: BuyInvestmentTransaction): void;
        /**
         * Gets the investment transaction aggregate.
         *
         * @return the investment transaction aggregate
         */
        getInvestmentTransaction(): InvestmentTransaction;
        /**
         * Gets the id of the security that was bought. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was bought
         */
        getSecurityId(): SecurityId;
        /**
         * Gets the number of units of the security that was bought. For security-based actions other
         * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the number of units purchased.
         */
        getUnits(): number;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Gets the portion of the unit price that is attributed to the dealer markup. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit markeup price
         */
        getMarkup(): number;
        /**
         * Gets the transaction commission for the purchase. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction commision
         */
        getCommission(): number;
        /**
         * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction taxes
         */
        getTaxes(): number;
        /**
         * Gets the fees for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction fees
         */
        getFees(): number;
        /**
         * Gets the load for the purchase. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the load
         */
        getLoad(): number;
        /**
         * Gets the total for the purchase. Should be equal to
         * (units * (unitPrice + markup)) + (commision + fees + load + taxes) according to the OFX
         * spec. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type or null if it wasn't one of the well known types.
         */
        getSubAccountFundEnum(): SubAccountType;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Sell investment transaction aggregate ("INVSELL").
     * @see "Section 13.9.2.4.3, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SellInvestmentTransaction {
        private investmentTransaction;
        private securityId;
        private units;
        private unitPrice;
        private markdown;
        private commission;
        private taxes;
        private fees;
        private load;
        private withholding;
        private taxExempt;
        private total;
        private gain;
        private currencyCode;
        private originalCurrencyInfo;
        private subAccountSecurity;
        private subAccountFund;
        private loanId;
        private stateWithholding;
        private penalty;
        private inv401kSource;
        /**
         * Gets the investment transaction child aggregate.
         *
         * @return the investment transaction child aggregate
         */
        getInvestmentTransaction(): InvestmentTransaction;
        /**
         * Sets the investment transaction child aggregate.
         *
         * @param investmentTransaction the investment transaction child aggregate
         */
        setInvestmentTransaction(investmentTransaction: InvestmentTransaction): void;
        /**
         * Gets the id of the security that was sold. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was sold
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that was sold. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security that was sold
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the number of units of the security that was sold. For security-based actions other
         * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the number of units sold
         */
        getUnits(): number;
        /**
         * Sets the number of units of the security that was sold. For security-based actions other
         * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param units the number of units sold
         */
        setUnits(units: number): void;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param unitPrice the per unit price
         */
        setUnitPrice(unitPrice: number): void;
        /**
         * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit markedown price
         */
        getMarkdown(): number;
        /**
         * Sets the portion of the unit price that is attributed to the dealer markdown. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param markdown the per unit markedown price
         */
        setMarkdown(markdown: number): void;
        /**
         * Gets the transaction commission for the sale. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction commision
         */
        getCommission(): number;
        /**
         * Sets the transaction commission for the sale. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param commission the transaction commision
         */
        setCommission(commission: number): void;
        /**
         * Gets the taxes for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction taxes
         */
        getTaxes(): number;
        /**
         * Sets the taxes for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param taxes the transaction taxes
         */
        setTaxes(taxes: number): void;
        /**
         * Gets the fees for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction fees
         */
        getFees(): number;
        /**
         * Sets the fees for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param fees the transaction fees
         */
        setFees(fees: number): void;
        /**
         * Gets the load for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the load
         */
        getLoad(): number;
        /**
         * Sets the load for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param load the load
         */
        setLoad(load: number): void;
        /**
         * Gets the withholding for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the withholding
         */
        getWithholding(): number;
        /**
         * Sets the withholding for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param withholding the withholding
         */
        setWithholding(withholding: number): void;
        /**
         * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return whether the transaction was tax exempt
         */
        getTaxExempt(): boolean;
        /**
         * Sets whether the sale was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param taxExempt whether the transaction was tax exempt
         */
        setTaxExempt(taxExempt: boolean): void;
        /**
         * Gets the total for the sale. Should be equal to
         * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
         * statewithholding) according to the OFX spec. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total for the sale. Should be equal to
         * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
         * statewithholding) according to the OFX spec. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the gain sale. This is aan optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the gain for the sale
         */
        getGain(): number;
        /**
         * Sets the gain sale. This is aan optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param gain the gain for the sale
         */
        setGain(gain: number): void;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * code should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * sets the currency code for the transaction. Only one of currency code or original currency
         * code should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrencyInfo the original currency info for the transaction
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountSecurity the sub account type
         */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type that the security is being transfered from
         * (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type that the security is being transfered from
         * (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountFund the sub account fund
         */
        setSubAccountFund(subAccountFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the loan id
         */
        getLoanId(): string;
        /**
         * Sets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param loanId the loan id
         */
        setLoanId(loanId: string): void;
        /**
         * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        getStateWithholding(): number;
        /**
         * Sets the state withholding for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param stateWithholding the state withholding
         */
        setStateWithholding(stateWithholding: number): void;
        /**
         * Gets the penalty for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        getPenalty(): number;
        /**
         * Sets the penalty for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param penalty the state withholding
         */
        setPenalty(penalty: number): void;
        /**
         * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the 401k source
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the 401k source
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401k source as one of the well-known types.
         *
         * @return the 401k source or null if its not one of the well-known types
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    /**
     * Base class for all investment transactions for selling securities.
     * <br>
     * This class exposes a read-only view of the flattened aggregates that are
     * common to all sell investment transactions as a convenience to application
     * developers who may not find the ofx aggregation model intuitive.
     *
     * @author Jon Perlow
     */
    class BaseSellInvestmentTransaction extends BaseInvestmentTransaction implements TransactionWithSecurity {
        private sellInvestment;
        constructor(transactionType: TransactionType);
        /**
         * Gets the sell investment transaction child aggregate.
         *
         * @return the sell investment transaction child aggregate
         */
        getSellInvestment(): SellInvestmentTransaction;
        /**
         * Sets the sell investment transaction child aggregate.
         *
         * @param sellInvestment the sell investment transaction child aggregate
         */
        setSellInvestment(sellInvestment: SellInvestmentTransaction): void;
        /**
         * Gets the investment transaction aggregate.
         *
         * @return the investment transaction aggregate
         */
        getInvestmentTransaction(): InvestmentTransaction;
        /**
         * Gets the id of the security that was sold. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was bought
         */
        getSecurityId(): SecurityId;
        /**
         * Gets the number of units of the security that was sold. For security-based actions other
         * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the number of units purchased.
         */
        getUnits(): number;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit markedown price
         */
        getMarkdown(): number;
        /**
         * Gets the transaction commission for the sale. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction commision
         */
        getCommission(): number;
        /**
         * Gets the taxes for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction taxes
         */
        getTaxes(): number;
        /**
         * Gets the fees for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction fees
         */
        getFees(): number;
        /**
         * Gets the load for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the load
         */
        getLoad(): number;
        /**
         * Gets the withholding for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the withholding
         */
        getWithholding(): number;
        /**
         * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return whether the transaction was tax exempt
         */
        getTaxExempt(): boolean;
        /**
         * Gets the total for the sale. Should be equal to
         * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
         * statewithholding) according to the OFX spec. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Gets the gain sale. This is aan optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the gain for the sale
         */
        getGain(): number;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction.
         */
        getCurrencyCode(): string;
        /**
         * Gets the origianl currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency info for the transaction.
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type that the money went to  (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
         * optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the loan id
         */
        getLoadId(): string;
        /**
         * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        getStateWithholding(): number;
        /**
         * Gets the penalty for the sale. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        getPenalty(): number;
        /**
         * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the 401k source
         */
        get401kSource(): string;
        /**
         * Gets the 401k source as one of the well-known types.
         *
         * @return the 401k source or null if its not one of the well-known types
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for buying debt (i.e. bonds, CDs, etc.,).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BuyDebtTransaction extends BaseBuyInvestmentTransaction {
        private accruedInterest;
        constructor();
        /**
         * Gets the amount of accrued interest on the debt. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the amount of accrued interest
         */
        getAccruedInterest(): number;
        /**
         * Sets the amount of accrued interest on the debt. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param accruedInterest the amount of accrued interest
         */
        setAccruedInterest(accruedInterest: number): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of purchase for stocks and mutual funds.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum BuyType {
        BUY = 0,
        BUY_TO_COVER = 1,
    }
    function BuyType_fromOfx(ofxVal: string): BuyType;
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for buying mutual funds.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BuyMutualFundTransaction extends BaseBuyInvestmentTransaction {
        private buyType;
        private relatedTransactionId;
        constructor();
        /**
         * Gets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
         * the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the buy type
         */
        getBuyType(): string;
        /**
         * Sets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
         * the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param buyType the buy type
         */
        setBuyType(buyType: string): void;
        /**
         * Gets the buy type as one of the well-known types.
         *
         * @return the type of purchase or null if it's not known
         */
        getBuyTypeEnum(): BuyType;
        /**
         * Gets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
         * This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the related transaction id
         */
        getRelatedTransactionId(): string;
        /**
         * Sets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
         * This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param relatedTransactionId the related transaction id
         */
        setRelatedTransactionId(relatedTransactionId: string): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of purchase for options.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum OptionBuyType {
        BUY_TO_OPEN = 0,
        BUY_TO_CLOSE = 1,
    }
    function OptionBuyType_fromOfx(ofxVal: string): OptionBuyType;
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for buying options.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BuyOptionTransaction extends BaseBuyInvestmentTransaction {
        private optionBuyType;
        private sharesPerContact;
        constructor();
        /**
         * Gets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the option buy type
         */
        getOptionBuyType(): string;
        /**
         * Sets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param optionBuyType the option buy type
         */
        setOptionBuyType(optionBuyType: string): void;
        /**
         * Gets the option buy type as one of the well-known types.
         *
         * @return the type of purchase or null if it's not known
         */
        getOptionBuyTypeEnum(): OptionBuyType;
        /**
         * Gets the number of shares per contact. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the number of shares per contact
         */
        getSharesPerContract(): number;
        /**
         * Sets the number of shares per contact. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param sharesPerContact the number of shares per contact
         */
        setSharesPerContract(sharesPerContact: number): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for buying other types of securities.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BuyOtherTransaction extends BaseBuyInvestmentTransaction {
        constructor();
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for buying stock.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class BuyStockTransaction extends BaseBuyInvestmentTransaction {
        private buyType;
        constructor();
        /**
         * Gets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the buy type
         */
        getBuyType(): string;
        /**
         * Sets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param buyType the buy type
         */
        setBuyType(buyType: string): void;
        /**
         * Gets the buy type as one of the well-known types.
         *
         * @return the type of purchase or null if it's not well known
         */
        getBuyTypeEnum(): BuyType;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of action for closing a stock option.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum CloseOptionAction {
        EXERCISE = 0,
        ASSIGN = 1,
        EXPIRE = 2,
    }
    function CloseOptionAction_fromOfx(ofxVal: string): CloseOptionAction;
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for closing an option position due to expiration, exercise, or assignment.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class CloseOptionTransaction extends BaseOtherInvestmentTransaction implements TransactionWithSecurity {
        private securityId;
        private optionAction;
        private units;
        private sharesPerContact;
        private subAccountSecurity;
        private relatedTransactionId;
        private gain;
        constructor();
        /**
         * Gets the security id of the option.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the security id of the option
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the security id of the option.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param securityId the security id of the option
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the option action
         */
        getOptionAction(): string;
        /**
         * Sets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param optionAction the option action
         */
        setOptionAction(optionAction: string): void;
        /**
         * Gets the action as one of the well-known types.
         *
         * @return the type of close or null if it's not a well-known type
         */
        getOptionActionEnum(): CloseOptionAction;
        /**
         * Gets the number of units of the option that were closed. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the number of units closed
         */
        getUnits(): number;
        /**
         * Sets the number of units of the option that were closed. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param units the number of units closed
         */
        setUnits(units: number): void;
        /**
         * Gets the number of shares per contact. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the number of shares per contact
         */
        getSharesPerContact(): number;
        /**
         * Sets the number of shares per contact. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param sharesPerContact the number of shares per contact
         */
        setSharesPerContact(sharesPerContact: number): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param subAccountSecurity the sub account type
         */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the related transaction id for the related buy or sell corresponding to the
         * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
         * action or EXERCISE or ASSIGN.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the related transaction id
         */
        getRelatedTransactionId(): string;
        /**
         * Sets the related transaction id for the related buy or sell corresponding to the
         * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
         * action or EXERCISE or ASSIGN.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param relatedTransactionId the related transaction id
         */
        setRelatedTransactionId(relatedTransactionId: string): void;
        /**
         * Gets the gain related to the transaction. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the gain related to the transaction
         */
        getGain(): number;
        /**
         * Sets the gain related to the transaction. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param gain the gain related to the transaction
         */
        setGain(gain: number): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of income.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum IncomeType {
        LONG_TERM_CAP_GAINS = 0,
        SHORT_TERM_CAP_GAINS = 1,
        DIVIDEND = 2,
        INTEREST = 3,
        MISC = 4,
    }
    function IncomeType_fromOfx(ofxVal: string): IncomeType;
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for investment income that is realized as cash into the investment account.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class IncomeTransaction extends BaseOtherInvestmentTransaction implements TransactionWithSecurity {
        private securityId;
        private incomeType;
        private total;
        private subAccountSecurity;
        private subAccountFund;
        private taxExempt;
        private withholding;
        private currencyCode;
        private originalCurrencyInfo;
        private inv401kSource;
        constructor();
        /**
         * Gets the id of the security that the income was for. This is a required field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the security id of the security that the income was for
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that the income was for. This is a required field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param securityId the security id of the security that the income was for
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
         * capital gains), "DIV" (dividend), INTEREST, or MISC>
         * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
         *
         * @return the type of income
         */
        getIncomeType(): string;
        /**
         * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
         * capital gains), "DIV" (dividend), INTEREST, or MISC>
         * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
         *
         * @param incomeType the type of income
         */
        setIncomeType(incomeType: string): void;
        /**
         * Gets the income type as one of the well-known types.
         *
         * @return the income type or null if it's not well known
         */
        getIncomeTypeEnum(): IncomeType;
        /**
         * Gets the total income received.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total income received.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAcctSec the sub account type
         */
        setSubAccountSecurity(subAcctSec: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund for the transaction
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAcctFund the sub account fund for the transaction
         */
        setSubAccountFund(subAcctFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return whether the transaction was tax exempt
         */
        getTaxExempt(): boolean;
        /**
         * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param taxExempt whether the transaction was tax exempt
         */
        setTaxExempt(taxExempt: boolean): void;
        /**
         * Gets the withholding for the income. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the withholding
         */
        getWithholding(): number;
        /**
         * Sets the withholding for the income. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param withholding the withholding
         */
        setWithholding(withholding: number): void;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * Sets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency info for the transaction
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrencyInfo the currency info for the transaction
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
         * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the state withholding
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401(k) source as one of the well-known types.
         *
         * @return the type of close or null if it's not well known.
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for an investment expense
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class InvestmentExpenseTransaction extends BaseOtherInvestmentTransaction {
        private securityId;
        private total;
        private subAccountSecurity;
        private subAccountFund;
        private currencyCode;
        private originalCurrencyInfo;
        private inv401kSource;
        constructor();
        /**
         * Gets the id of the security for the expense. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security for the expsense
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security for the expense. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security for the expsense
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the total for the expense.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total for the expense.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountSecurity the sub account type
         */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountFund the sub account fund
         */
        setSubAccountFund(subAccountFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * code should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * sets the currency code for the transaction. Only one of currency code or original currency
         * code should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrencyInfo the original currency info for the transaction
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
         * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the 401k source
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the 401k source
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401k source as one of the well-known types.
         *
         * @return the 401k source or null if its not one of the well-known types
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    /**
     * Transaction for journal fund transactions between sub-accounts within the same investment
     * account.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class JournalFundTransaction extends BaseOtherInvestmentTransaction {
        private subAccountFrom;
        private subAccountTo;
        private total;
        constructor();
        /**
         * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sub account type
         */
        getFromSubAccountFund(): string;
        /**
         * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param subAccountFrom the sub account type
         */
        setFromSubAccountFund(subAccountFrom: string): void;
        /**
         * Gets the result of getFromSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getFromSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sub account fund
         */
        getToSubAccountFund(): string;
        /**
         * Sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param subAccountTo the sub account fund
         */
        setToSubAccountFund(subAccountTo: string): void;
        /**
         * Gets the result of getToSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getToSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the total for the transaction.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total for the transaction.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for journal security transactions between sub-accounts within the same investment
     * account.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class JournalSecurityTransaction extends BaseOtherInvestmentTransaction implements TransactionWithSecurity {
        private securityId;
        private subAccountFrom;
        private subAccountTo;
        private total;
        constructor();
        /**
         * Gets the id of the security that was transferred. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was bought
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that was transferred. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security that was bought
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sub account type
         */
        getFromSubAccountFund(): string;
        /**
         * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param subAccountFrom the sub account type
         */
        setFromSubAccountFund(subAccountFrom: string): void;
        /**
         * Gets the result of getFromSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getFromSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sub account fund
         */
        getToSubAccountFund(): string;
        /**
         * sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param subAccountTo the sub account fund
         */
        setToSubAccountFund(subAccountTo: string): void;
        /**
         * Gets the result of getToSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getToSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the total for the transaction.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total for the transaction.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    /**
     * Transaction for journal security transactions between sub-accounts within the same investment
     * account.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class MarginInterestTransaction extends BaseOtherInvestmentTransaction {
        private total;
        private subAccountFund;
        private currencyCode;
        private originalCurrencyInfo;
        constructor();
        /**
         * Gets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param subAccountFund the sub account type
         */
        setSubAccountFund(subAccountFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the total for the transaction.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total for the transaction.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction.
         */
        getCurrencyCode(): string;
        /**
         * Sets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction.
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction.
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrency the original currency info for the transaction.
         */
        setOriginalCurrencyInfo(originalCurrency: OriginalCurrency): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of sale for options.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum OptionSellType {
        SELL_TO_CLOSE = 0,
        SELL_TO_OPEN = 1,
    }
    function OptionSellType_fromOfx(ofxVal: string): OptionSellType;
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for reinvestment transactions.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class ReinvestIncomeTransaction extends BaseOtherInvestmentTransaction implements TransactionWithSecurity {
        private securityId;
        private incomeType;
        private total;
        private subAccountSecurity;
        private units;
        private unitPrice;
        private commission;
        private taxes;
        private fees;
        private load;
        private taxExempt;
        private currencyCode;
        private originalCurrencyInfo;
        private inv401kSource;
        constructor();
        /**
         * Gets the id of the security that was reinvested in. This is a required field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was reinvested in
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that was reinvested in. This is a required field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security that was reinvested in
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
         * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
         *
         * @return the type of income
         */
        getIncomeType(): string;
        /**
         * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
         * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
         *
         * @param incomeType the type of income
         */
        setIncomeType(incomeType: string): void;
        /**
         * Gets the type of income as one of the well-known types.
         *
         * @return the income type or null if it's not one of the well-known types
         */
        getIncomeTypeEnum(): IncomeType;
        /**
         * Gets the total income received. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total income received. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountSecurity the sub account type
         */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the number of units of the security that was reinvested in. This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the number of units purchased
         */
        getUnits(): number;
        /**
         * Sets the number of units of the security that was reinvested in. This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param units the number of units purchased
         */
        setUnits(units: number): void;
        /**
         * Gets the price per commonly-quoted unit. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Sets the price per commonly-quoted unit. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param unitPrice the per unit price
         */
        setUnitPrice(unitPrice: number): void;
        /**
         * Gets the transaction commission for the reinvestment. This is an optional field according to
         * the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction commision
         */
        getCommission(): number;
        /**
         * Sets the transaction commission for the reinvestment. This is an optional field according to
         * the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param commission the transaction commision
         */
        setCommission(commission: number): void;
        /**
         * Gets the taxes for the reinvestment. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction taxes
         */
        getTaxes(): number;
        /**
         * Sets the taxes for the reinvestment. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param taxes the transaction taxes
         */
        setTaxes(taxes: number): void;
        /**
         * Gets the fees for the reinvestment. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the transaction fees
         */
        getFees(): number;
        /**
         * Sets the fees for the reinvestment. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param fees the transaction fees
         */
        setFees(fees: number): void;
        /**
         * Gets the load for the reinvestment. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the load
         */
        getLoad(): number;
        /**
         * Sets the load for the reinvestment. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param load the load
         */
        setLoad(load: number): void;
        /**
         * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return whether the transaction was tax exempt
         */
        getTaxExempt(): boolean;
        /**
         * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param taxExempt whether the transaction was tax exempt
         */
        setTaxExempt(taxExempt: boolean): void;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * Sets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction.
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrencyInfo the original currency info for the transaction.
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
         * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the state withholding
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401(k) source as one of the well-known types.
         *
         * @return the type of close or null if it's not well known
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Related option transaction type.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum RelatedOptionType {
        SPREAD = 0,
        STRADDLE = 1,
        NONE = 2,
        OTHER = 3,
    }
    function RelatedOptionType_fromOfx(ofxVal: string): RelatedOptionType;
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for return of capital transactions.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class ReturnOfCapitalTransaction extends BaseOtherInvestmentTransaction implements TransactionWithSecurity {
        private securityId;
        private total;
        private subAccountSecurity;
        private subAccountFund;
        private currencyCode;
        private originalCurrencyInfo;
        private inv401kSource;
        constructor();
        /**
         * Gets the id of the security that capital was returned from. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that capital was returned from
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that capital was returned from. This is a required field according
         * to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security that capital was returned from
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the total amount of capital returned. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the total
         */
        getTotal(): number;
        /**
         * Sets the total amount of capital returned. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param total the total
         */
        setTotal(total: number): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountSecurity the sub account type
         */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the sub account type that the transaction affects.
         * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type that the transaction affects.
         * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountFund the sub account fund
         */
        setSubAccountFund(subAccountFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * Sets the currency code for the transaction. Only one of currency code or original currency
         * info should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param currencyCode the currency code for the transaction
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction.
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param originalCurrencyInfo the currency code for the transaction.
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
         * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the state withholding
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401(k) source as one of the well-known types.
         *
         * @return the type of close or null if it's not well known.
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Reason debt was sold.
     * @see "Section 13.9.2.4.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum SellDebtReason {
        CALL = 0,
        SELL = 1,
        MATURITY = 2,
    }
    function SellDebtReason_fromOfx(ofxVal: string): SellDebtReason;
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for selling debt (i.e. bonds, CDs, etc.,).
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SellDebtTransaction extends BaseSellInvestmentTransaction {
        private sellReason;
        private accruedInterest;
        constructor();
        /**
         * Gets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
         * "MATURITY" (the debt reached maturity).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return The reason for the sale
         */
        getSellReason(): string;
        /**
         * Sets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
         * "MATURITY" (the debt reached maturity).
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param sellReason The reason for the sale
         */
        setSellReason(sellReason: string): void;
        /**
         * Gets the sell reason as one of the well-known types.
         *
         * @return the sell reason or null if it's not well known
         */
        getSellReasonEnum(): SellDebtReason;
        /**
         * Gets the amount of accrued interest on the debt. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the amount of accrued interest
         */
        getAccruedInterest(): number;
        /**
         * Sets the amount of accrued interest on the debt. This is an optional field according to the
         * OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param accruedInterest the amount of accrued interest
         */
        setAccruedInterest(accruedInterest: number): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of sale for stocks and mutual funds.
     *
     * @author Jon Perlow
     */
    enum SellType {
        SELL = 0,
        SELL_SHORT = 1,
    }
    function SellType_fromOfx(ofxVal: string): SellType;
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for selling mutual fund.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SellMutualFundTransaction extends BaseSellInvestmentTransaction {
        private sellType;
        private averageCostBasis;
        private relatedTransactionId;
        constructor();
        /**
         * Gets the type of sale. One of "SELL" or "SELLSHORT".
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return The type of sale
         */
        getSellType(): string;
        /**
         * Sets the type of sale. One of "SELL" or "SELLSHORT".
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param sellType The type of sale
         */
        setSellType(sellType: string): void;
        /**
         * Gets the sell type as one of the well-known types.
         *
         * @return the type of sale or null if it's not known.
         */
        getSellTypeEnum(): SellType;
        /**
         * Gets the average cost basis of the sale.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return The average cost basis of the sale
         */
        getAverageCostBasis(): number;
        /**
         * Sets the average cost basis of the sale.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param averageCostBasis The average cost basis of the sale
         */
        setAverageCostBasis(averageCostBasis: number): void;
        /**
         * Gets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
         * This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the related transaction id
         */
        getRelatedTransactionId(): string;
        /**
         * Sets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
         * This is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param relatedTransactionId the related transaction id
         */
        setRelatedTransactionId(relatedTransactionId: string): void;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import ShortOptionSecurity = ofx4js.domain.data.investment.positions.ShortOptionSecurity;
    /**
     * Transaction for selling options.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SellOptionTransaction extends BaseSellInvestmentTransaction {
        private optionSellType;
        private sharesPerContact;
        private relatedTransactionId;
        private relatedType;
        private secured;
        constructor();
        /**
         * Gets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the option sell type
         */
        getOptionSellType(): string;
        /**
         * Sets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param optionSellType the option sell type
         */
        setOptionSellType(optionSellType: string): void;
        /**
         * Gets the option sell type as one of the well-known types.
         *
         * @return the type of sale or null if it's not known.
         */
        getOptionSellTypeEnum(): OptionSellType;
        /**
         * Gets the number of shares per contact. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the number of shares per contact
         */
        getSharesPerContact(): number;
        /**
         * Sets the number of shares per contact. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param sharesPerContact the number of shares per contact
         */
        setSharesPerContact(sharesPerContact: number): void;
        /**
         * Gets a related transaction for the option sale for complex option transactions. This
         * is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return The related transaction id
         */
        getRelatedTransactionId(): string;
        /**
         * Sets a related transaction for the option sale for complex option transactions. This
         * is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param relatedTransactionId The related transaction id
         */
        setRelatedTransactionId(relatedTransactionId: string): void;
        /**
         * Gets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
         * is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return The related tansaction type
         */
        getRelatedType(): string;
        /**
         * Sets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
         * is an optional field according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param relatedType The related tansaction type
         */
        setRelatedType(relatedType: string): void;
        /**
         * Gets the related transaction as one of the well-known types.
         *
         * @return the related tansaction type or null if it's not well known
         */
        getRelatedTypeEnum(): RelatedOptionType;
        /**
         * Gets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return how the option sale is secured
         */
        getSecured(): string;
        /**
         * Sets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param secured how the option sale is secured
         */
        setSecured(secured: string): void;
        /**
         * Gets how the option sale is secured as one of the well-known types.
         *
         * @return the type indicating how the option is secured or null if it's not well known.
         */
        getSecuredEnum(): ShortOptionSecurity;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for buying other types of securities.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SellOtherTransaction extends BaseSellInvestmentTransaction {
        constructor();
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Transaction for selling stock.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SellStockTransaction extends BaseSellInvestmentTransaction {
        private sellType;
        constructor();
        /**
         * Gets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @return the sell type
         */
        getSellType(): string;
        /**
         * Sets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.4, OFX Spec"
         *
         * @param sellType the sell type
         */
        setSellType(sellType: string): void;
        /**
         * Gets the sell type as one of the well-known types.
         *
         * @return the type of sale or null if it's not known
         */
        getSellTypeEnum(): SellType;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for a stock split.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class SplitTransaction extends BaseOtherInvestmentTransaction {
        private securityId;
        private subAccountSecurity;
        private oldUnits;
        private newUnits;
        private numerator;
        private denominator;
        private currencyCode;
        private originalCurrencyInfo;
        private cashForFractionalUnits;
        private subAccountFund;
        private inv401kSource;
        constructor();
        /**
         * Gets the id of the security for the split. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security for the expsense
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security for the split. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security for the expsense
         */
        setSecurityId(securityId: SecurityId): void;
        /**
         * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account type
         */
        getSubAccountSecurity(): string;
        /**
         * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
         * required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountSecurity the sub account type
         */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the old number of units for the split. This is a required field according to the OFX
         * spec.
         *
         * @return the old number of units.
         */
        getOldUnits(): number;
        /**
         * Sets the old number of units for the split. This is a  equired field according to the OFX
         * spec.
         *
         * @param oldUnits the old number of units.
         */
        setOldUnits(oldUnits: number): void;
        /**
         * Gets the new number of units for the split. This is a required field according to the OFX
         * spec.
         *
         * @return the new number of units.
         */
        getNewUnits(): number;
        /**
         * Sets the new number of units for the split. This is a required field according to the OFX
         * spec.
         *
         * @param newUnits the new number of units.
         */
        setNewUnits(newUnits: number): void;
        /**
         * Gets the numerator for the split ratio. This is a required field according to the OFX spec.
         *
         * @return the numerator for the split ratio
         */
        getNumerator(): number;
        /**
         * Sets the numerator for the split ratio. This is a required field according to the OFX spec.
         *
         * @param numerator the numerator for the split ratio
         */
        setNumerator(numerator: number): void;
        /**
         * Gets the denominator for the split ratio. This is a required field according to the OFX spec.
         *
         * @return the numerator for the split ratio
         */
        getDenominator(): number;
        /**
         * Sets the denominator for the split ratio. This is a required field according to the OFX spec.
         *
         * @param denominator the numerator for the split ratio
         */
        setDenominator(denominator: number): void;
        /**
         * Gets the currency code for the transaction. Only one of currency code or original currency
         * code should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        getCurrencyCode(): string;
        /**
         * sets the currency code for the transaction. Only one of currency code or original currency
         * code should be set according to the OFX spec. If neither are set, means the default currency.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the currency code for the transaction
         */
        setCurrencyCode(currencyCode: string): void;
        /**
         * Gets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction
         */
        getOriginalCurrencyInfo(): OriginalCurrency;
        /**
         * Sets the original currency info for the transaction.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the original currency info for the transaction
         */
        setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void;
        /**
         * Gets the cash for fractional units.
         *
         * @return the cash for fractional units
         */
        getCashForFractionalUnits(): number;
        /**
         * Sets the cash for fractional units.
         *
         * @param cashForFractionalUnits the cash for fractional units
         */
        setCashForFractionalUnits(cashForFractionalUnits: number): void;
        /**
         * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the sub account fund
         */
        getSubAccountFund(): string;
        /**
         * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param subAccountFund the sub account fund
         */
        setSubAccountFund(subAccountFund: string): void;
        /**
         * Gets the result of getSubAccountFund as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types
         */
        getSubAccountFundEnum(): SubAccountType;
        /**
         * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the 401k source
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the 401k source
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401k source as one of the well-known types.
         *
         * @return the 401k source or null if its not one of the well-known types
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.investment.transactions {
    /**
     * Type of transfer.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum TransferAction {
        IN = 0,
        OUT = 1,
    }
    function TransferAction_fromOfx(ofxVal: string): TransferAction;
}
declare module ofx4js.domain.data.investment.transactions {
    import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
    import Inv401KSource = ofx4js.domain.data.investment.positions.Inv401KSource;
    import PositionType = ofx4js.domain.data.investment.positions.PositionType;
    import SecurityId = ofx4js.domain.data.seclist.SecurityId;
    /**
     * Transaction for transfers.
     * @see "Section 13.9.2.4.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class TransferInvestmentTransaction extends BaseOtherInvestmentTransaction {
        private securityId;
        private subAccountSecurity;
        private units;
        private transferAction;
        private positionType;
        private averageCostBasis;
        private unitPrice;
        private purchaseDate;
        private inv401kSource;
        constructor();
        /**
         * Gets the id of the security that was transferred. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the security id of the security that was transferred
         */
        getSecurityId(): SecurityId;
        /**
         * Sets the id of the security that was transferred. This is a required field according to the OFX
         * spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param securityId the security id of the security that was transferred
         */
        setSecurityId(securityId: SecurityId): void;
        /**
          * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
          * @see "Section 13.9.2.4.3, OFX Spec"
          *
          * @return the sub account type
          */
        getSubAccountSecurity(): string;
        /**
          * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
          * @see "Section 13.9.2.4.3, OFX Spec"
          *
          * @param subAccountSecurity the sub account type
          */
        setSubAccountSecurity(subAccountSecurity: string): void;
        /**
         * Gets the result of getSubAccountSecurity as one of the well-known types.
         *
         * @return the type of null if it wasn't one of the well known types.
         */
        getSubAccountSecurityEnum(): SubAccountType;
        /**
         * Gets the number of units of the security that was transferred. For security-based actions other
         * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the number of units transferred
         */
        getUnits(): number;
        /**
         * Sets the number of units of the security that was transferred. For security-based actions other
         * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
         * is the number of shares. For bonds, this is the face value. For options, this is the number of
         * contacts. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param units the number of units transferred
         */
        setUnits(units: number): void;
        /**
         * Gets the type of transfer. One of "IN" or "OUT". This is a required field according to the
         * OFX spec.
         *
         * @return the type of transfer
         */
        getTransferAction(): string;
        /**
         * Sets the type of transfer. One of "IN" or "OUT". This is a required field according to the
         * OFX spec.
         *
         * @param transferAction the type of transfer
         */
        setTransferAction(transferAction: string): void;
        /**
         * Gets the transfer action as one of the well-known types.
         *
         * @return the type of transfer or null if it's not well known
         */
        getTransferActionEnum(): TransferAction;
        /**
         * Gets the type of position. One of "LONG" or "SHORT". This is a required field according to the
         * OFX spec.
         *
         * @return the position type
         */
        getPositionType(): string;
        /**
         * Sets the type of position. One of "LONG" or "SHORT". This is a required field according to the
         * OFX spec.
         *
         * @param positionType the position type
         */
        setPositionType(positionType: string): void;
        /**
         * Gets the position type as one of the well-known types.
         *
         * @return the position type or null if it's not well known
         */
        getPositionTypeEnum(): PositionType;
        /**
         * Gets the average cost basis for the securities being transfered. This is an optional field
         * according to the ofx spec.
         *
         * @return the average cost basis
         */
        getAverageCostBasis(): number;
        /**
         * Sets the average cost basis for the securities being transfered. This is an optional field
         * according to the ofx spec.
         *
         * @param averageCostBasis the average cost basis
         */
        setAverageCostBasis(averageCostBasis: number): void;
        /**
         * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the per unit price
         */
        getUnitPrice(): number;
        /**
         * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
         * share price. For bonds, this is the percentage of par. For options, this is the per share (not
         * per contact) price. This is a required field according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param unitPrice the per unit price
         */
        setUnitPrice(unitPrice: number): void;
        /**
         * Gets the original date of purchase for the securities. This is an optional field according to
         * the ofx spec.
         *
         * @return the original date of purchase
         */
        getPurchaseDate(): Date;
        /**
         * Sets the original date of purchase for the securities. This is an optional field according to
         * the ofx spec.
         *
         * @param purchaseDate the original date of purchase
         */
        setPurchaseDate(purchaseDate: Date): void;
        /**
         * Gets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @return the state withholding
         */
        get401kSource(): string;
        /**
         * Sets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
         * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
         * according to the OFX spec.
         * @see "Section 13.9.2.4.3, OFX Spec"
         *
         * @param inv401kSource the state withholding
         */
        set401kSource(inv401kSource: string): void;
        /**
         * Gets the 401(k) source as one of the well-known types.
         *
         * @return the type of close or null if it's not well known.
         */
        get401kSourceEnum(): Inv401KSource;
    }
}
declare module ofx4js.domain.data.profile.info.banking {
    /**
     * Email Profile
     * @author Scott Priddy
     * @see "Section 11.13.2.3 OFX Spec"
     */
    class EmailProfile {
        private canEmail;
        private canNotify;
        getCanEmail(): boolean;
        setCanEmail(canEmail: boolean): void;
        getCanNotify(): boolean;
        setCanNotify(canNotify: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info.banking {
    import ProcessorDayOff = ofx4js.domain.data.common.ProcessorDayOff;
    /**
     * Stop Check Profile
     * @author Scott Priddy
     * @see "Section 11.13.2.3 OFX Spec"
     */
    class StopCheckProfile {
        private processorDaysOff;
        private processEndTime;
        private canUseRange;
        private canUseDescription;
        private stopCheckFee;
        /**
         * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
         * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
         * @return List of days during the week that no processing occurs.
         */
        getProcessorDaysOff(): Array<ProcessorDayOff>;
        setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void;
        /**
         * Gets time of day that day's processing ends.
         *
         * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
         * the milliseconds and time zone are still optional, and default to GMT.
         * @see "Section 3.2.8.3 OFX Spec"
         * @return Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
         */
        getProcessEndTime(): string;
        /**
         * Sets the time of day that day's processing ends.
         *
         * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
         * the milliseconds and time zone are still optional, and default to GMT.
      
         * @see "Section 3.2.8.3 OFX Spec"
         * @param processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
         */
        setProcessEndTime(processEndTime: string): void;
        getCanUseRange(): boolean;
        setCanUseRange(canUseRange: boolean): void;
        getCanUseDescription(): boolean;
        setCanUseDescription(canUseDescription: boolean): void;
        getStopCheckFee(): number;
        setStopCheckFee(stopCheckFee: number): void;
    }
}
declare module ofx4js.domain.data.profile.info.common {
    /**
     * Image Profile
     * @author Scott Priddy
     * @see "Section 3.1.6.2 OFX Spec"
     */
    class ImageProfile {
        private closingImageAvailable;
        private transactionImageAvailable;
        getClosingImageAvailable(): boolean;
        setClosingImageAvailable(closingImageAvailable: boolean): void;
        getTransactionImageAvailable(): boolean;
        setTransactionImageAvailable(transactionImageAvailable: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info.common {
    import ProcessorDayOff = ofx4js.domain.data.common.ProcessorDayOff;
    /**
     * Funds Transfer Profile
     * @author Scott Priddy
     * @see "Section 11.13.2.2 OFX Spec"
     */
    class TransferProfile {
        private processorDaysOff;
        private processEndTime;
        private supportsScheduledTransfers;
        private supportsRecurringTransfers;
        private supportsLoanTransfers;
        private supportsScheduledLoanTransfers;
        private supportsRecurringLoanTransfers;
        private supportsTransferModification;
        private supportsModelModification;
        private modelWindow;
        private withdrawnDays;
        private defaultDaysToPay;
        /**
         * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
         * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
         * @return List of days during the week that no processing occurs.
         */
        getProcessorDaysOff(): Array<ProcessorDayOff>;
        setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void;
        /**
         * Gets time of day that day's processing ends.
         *
         * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
         * the milliseconds and time zone are still optional, and default to GMT.
         * @see "Section 3.2.8.3 OFX Spec"
         * @return Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
         */
        getProcessEndTime(): string;
        /**
         * Sets the time of day that day's processing ends.
         *
         * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
         * the milliseconds and time zone are still optional, and default to GMT.
      
         * @see "Section 3.2.8.3 OFX Spec"
         * @param processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
         */
        setProcessEndTime(processEndTime: string): void;
        getSupportsScheduledTransfers(): boolean;
        setSupportsScheduledTransfers(supportsScheduledTransfers: boolean): void;
        /**
         * Requires <CANSCHED>
         * @return Boolean whether supports recurring transfers
         */
        getSupportsRecurringTransfers(): boolean;
        setSupportsRecurringTransfers(supportsRecurringTransfers: boolean): void;
        /**
         * <CANLOAN>Y must be present for transfers to involve loans
         * @return Boolean whether supports loan transfers
         */
        getSupportsLoanTransfers(): boolean;
        setSupportsLoanTransfers(supportsLoanTransfers: boolean): void;
        getSupportsScheduledLoanTransfers(): boolean;
        setSupportsScheduledLoanTransfers(supportsScheduledLoanTransfers: boolean): void;
        getSupportsRecurringLoanTransfers(): boolean;
        setSupportsRecurringLoanTransfers(supportsRecurringLoanTransfers: boolean): void;
        getSupportsTransferModification(): boolean;
        setSupportsTransferModification(supportsTransferModification: boolean): void;
        getSupportsModelModification(): boolean;
        setSupportsModelModification(supportsModelModification: boolean): void;
        /**
         * Model window
         * the number of days before a recurring transaction is scheduled to be processed that it is
         * instantiated on the system
         * @return Number number of days before a recurring transaction is scheduled to be processed that it is instantiated on the system
         */
        getModelWindow(): number;
        setModelWindow(modelWindow: number): void;
        /**
         * Number of days before processing date that funds are withdrawn
         * @return Number number of days before processing date that funds are withdrawn
         */
        getWithdrawnDays(): number;
        setWithdrawnDays(withdrawnDays: number): void;
        /**
         * Default number of days to pay
         * @return Number Default number of days to pay
         */
        getDefaultDaysToPay(): number;
        setDefaultDaysToPay(defaultDaysToPay: number): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AccountType = ofx4js.domain.data.banking.AccountType;
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import EmailProfile = ofx4js.domain.data.profile.info.banking.EmailProfile;
    import ImageProfile = ofx4js.domain.data.profile.info.common.ImageProfile;
    import StopCheckProfile = ofx4js.domain.data.profile.info.banking.StopCheckProfile;
    import TransferProfile = ofx4js.domain.data.profile.info.common.TransferProfile;
    /**
     * Banking Message Set Profile
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 11.13.2.1 OFX Spec"
     */
    class BankingV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private invalidAccountTypes;
        private closingAvail;
        private transferProfile;
        private stopCheckProfile;
        private emailProfile;
        private imageProfile;
        getMessageSetType(): MessageSetType;
        /**
         * The invalidAccountTypes list.
         *
         * @return The invalidAccountTypes list.
         */
        getInvalidAccountTypes(): Array<AccountType>;
        /**
         * The invalidAccountTypes list.
         *
         * @param invalidAccountTypes The invalidAccountTypes list.
         */
        setInvalidAccountTypes(invalidAccountTypes: Array<AccountType>): void;
        /**
         * Gets whether closing statement information is available
         *
         * @return whether closing statement information is available
         */
        getClosingAvail(): boolean;
        /**
         * Sets whether closing statement information is available
         *
         * @param closingAvail whether closing statement information is available
         */
        setClosingAvail(closingAvail: boolean): void;
        getTransferProfile(): TransferProfile;
        setTransferProfile(transferProfile: TransferProfile): void;
        getStopCheckProfile(): StopCheckProfile;
        setStopCheckProfile(stopCheckProfile: StopCheckProfile): void;
        getEmailProfile(): EmailProfile;
        setEmailProfile(emailProfile: EmailProfile): void;
        getImageProfile(): ImageProfile;
        setImageProfile(imageProfile: ImageProfile): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class BankingMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): BankingV1MessageSetInfo;
        setVersion1Info(version1Info: BankingV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import ProcessorDayOff = ofx4js.domain.data.common.ProcessorDayOff;
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * BillPay Message Set Profile
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 12.11.2 OFX Spec"
     */
    class BillpayV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private daysWith;
        private defaultDaysToPay;
        private transferDaysWith;
        private transferDefaultDaysToPay;
        private processorDaysOff;
        private processorEndTime;
        private modelWindow;
        private postProcessorWindow;
        private supportsStatusUpdateViaPaymentModificationResponse;
        private supportsPaymentByAddress;
        private supportsPaymentByTransfer;
        private supportsPaymentByPayeeId;
        private userCanAddPayee;
        private supportsExtendedPayment;
        private canModifyPayments;
        private canModifyModels;
        private supportsDifferentFirstPayment;
        private supportsDifferentLastPayment;
        private supportsBillPresentmentContext;
        getMessageSetType(): MessageSetType;
        getDaysWith(): number;
        setDaysWith(daysWith: number): void;
        getDefaultDaysToPay(): number;
        setDefaultDaysToPay(defaultDaysToPay: number): void;
        getTransferDaysWith(): number;
        setTransferDaysWith(transferDaysWith: number): void;
        getTransferDefaultDaysToPay(): number;
        setTransferDefaultDaysToPay(transferDefaultDaysToPay: number): void;
        getProcessorDaysOff(): Array<ProcessorDayOff>;
        setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void;
        getProcessorEndTime(): string;
        setProcessorEndTime(processorEndTime: string): void;
        getModelWindow(): number;
        setModelWindow(modelWindow: number): void;
        getPostProcessorWindow(): number;
        setPostProcessorWindow(postProcessorWindow: number): void;
        getSupportsStatusUpdateViaPaymentModificationResponse(): boolean;
        setSupportsStatusUpdateViaPaymentModificationResponse(supportsStatusUpdateViaPaymentModificationResponse: boolean): void;
        getSupportsPaymentByAddress(): boolean;
        setSupportsPaymentByAddress(supportsPaymentByAddress: boolean): void;
        getSupportsPaymentByTransfer(): boolean;
        setSupportsPaymentByTransfer(supportsPaymentByTransfer: boolean): void;
        getSupportsPaymentByPayeeId(): boolean;
        setSupportsPaymentByPayeeId(supportsPaymentByPayeeId: boolean): void;
        getUserCanAddPayee(): boolean;
        setUserCanAddPayee(userCanAddPayee: boolean): void;
        getSupportsExtendedPayment(): boolean;
        setSupportsExtendedPayment(supportsExtendedPayment: boolean): void;
        getCanModifyPayments(): boolean;
        setCanModifyPayments(canModifyPayments: boolean): void;
        getCanModifyModels(): boolean;
        setCanModifyModels(canModifyModels: boolean): void;
        getSupportsDifferentFirstPayment(): boolean;
        setSupportsDifferentFirstPayment(supportsDifferentFirstPayment: boolean): void;
        getSupportsDifferentLastPayment(): boolean;
        setSupportsDifferentLastPayment(supportsDifferentLastPayment: boolean): void;
        getSupportsBillPresentmentContext(): boolean;
        setSupportsBillPresentmentContext(supportsBillPresentmentContext: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class BillpayMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): BillpayV1MessageSetInfo;
        setVersion1Info(version1Info: BillpayV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ImageProfile = ofx4js.domain.data.profile.info.common.ImageProfile;
    /**
     * Credit Card Message Set Profile
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 11.13.3 OFX Spec"
     */
    class CreditCardV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private closingAvail;
        private imageProfile;
        getMessageSetType(): MessageSetType;
        /**
         * Closing statement information available
         * @return Boolean
         */
        getClosingAvail(): boolean;
        setClosingAvail(closingAvail: boolean): void;
        /**
         * Image profile (if supported)
         * @return ImageProfile
         */
        getImageProfile(): ImageProfile;
        setImageProfile(imageProfile: ImageProfile): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class CreditCardMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): CreditCardV1MessageSetInfo;
        setVersion1Info(version1Info: CreditCardV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * Email Message Set Profile Information
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 9.4.2 OFX Spec"
     */
    class EmailV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private supportsMail;
        private supportsMimeType;
        getMessageSetType(): MessageSetType;
        /**
         * Y if server supports <MAILRQ> request.
         * N if server supports only the <MAILSYNCRQ> request.
         * @return Boolean
         */
        getSupportsMail(): boolean;
        setSupportsMail(supportsMail: boolean): void;
        /**
         * Y if server supports get MIME message
         * @return Boolean
         */
        getSupportsMimeType(): boolean;
        setSupportsMimeType(supportsMimeType: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class EmailMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): EmailV1MessageSetInfo;
        setVersion1Info(version1Info: EmailV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import TransferProfile = ofx4js.domain.data.profile.info.common.TransferProfile;
    /**
     * Interbank Funds Transfer Message Set Profile
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 11.13.4 OFX Spec"
     */
    class InterbankTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private transferProfile;
        private supportsBillPay;
        private cancelWindow;
        private domesticInterbankTransferFee;
        private internationalInterbankTransferFee;
        getMessageSetType(): MessageSetType;
        getTransferProfile(): TransferProfile;
        setTransferProfile(transferProfile: TransferProfile): void;
        getSupportsBillPay(): boolean;
        setSupportsBillPay(supportsBillPay: boolean): void;
        getCancelWindow(): number;
        setCancelWindow(cancelWindow: number): void;
        getDomesticInterbankTransferFee(): number;
        setDomesticInterbankTransferFee(domesticInterbankTransferFee: number): void;
        getInternationalInterbankTransferFee(): number;
        setInternationalInterbankTransferFee(internationalInterbankTransferFee: number): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class InterbankTransferMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): InterbankTransferV1MessageSetInfo;
        setVersion1Info(version1Info: InterbankTransferV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * @see "Section 13.7.1.1, OFX Spec"
     *
     * @author Jon Perlow
     * @author Ryan Heaton
     */
    class InvestmentV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private supportsStatementsDownload;
        private supportsOpenOrdersDownload;
        private supportsPositionsDownload;
        private supportsBalanceDownload;
        private supportsEmail;
        private supports401kInformation;
        private supportsClosingStatements;
        getMessageSetType(): MessageSetType;
        getSupportsStatementsDownload(): boolean;
        setSupportsStatementsDownload(supportsStatementsDownload: boolean): void;
        getSupportsOpenOrdersDownload(): boolean;
        setSupportsOpenOrdersDownload(supportsOpenOrdersDownload: boolean): void;
        getSupportsPositionsDownload(): boolean;
        setSupportsPositionsDownload(supportsPositionsDownload: boolean): void;
        getSupportsBalanceDownload(): boolean;
        setSupportsBalanceDownload(supportsBalanceDownload: boolean): void;
        getSupportsEmail(): boolean;
        setSupportsEmail(supportsEmail: boolean): void;
        getSupports401kInformation(): boolean;
        setSupports401kInformation(supports401kInformation: boolean): void;
        getSupportsClosingStatements(): boolean;
        setSupportsClosingStatements(supportsClosingStatements: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class InvestmentMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): InvestmentV1MessageSetInfo;
        setVersion1Info(version1Info: InvestmentV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * @author Ryan Heaton
     */
    class ProfileV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        getMessageSetType(): MessageSetType;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class ProfileMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): ProfileV1MessageSetInfo;
        setVersion1Info(version1Info: ProfileV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * @see "Section 13.7.2.1, OFX Spec"
     *
     * @author Jon Perlow
     * @author Ryan Heaton
     */
    class SecurityListV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private supportsSecurityListDownload;
        getMessageSetType(): MessageSetType;
        getSupportsSecurityListDownload(): boolean;
        setSupportsSecurityListDownload(supportsSecurityListDownload: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class SecurityListMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): SecurityListV1MessageSetInfo;
        setVersion1Info(version1Info: SecurityListV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    /**
     * @author Jon Perlow
     */
    class SignOnV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        getMessageSetType(): MessageSetType;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Jon Perlow
     */
    class SignOnMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): SignOnV1MessageSetInfo;
        setVersion1Info(version1Info: SignOnV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info.signup {
    /**
     * Client Enrollment option, contains indicator as to whether the account number is required as part of enrollment
     * @author Scott Priddy
     * @see "Section 8.8 OFX Spec"
     */
    class ClientEnrollment {
        private accountRequired;
        /**
         * Y if account number is required as part of enrollment
         * @return Boolean
         */
        getAccountRequired(): boolean;
        setAccountRequired(accountRequired: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info.signup {
    /**
     * Other Enrollment option containing a text message directing users to some other method (such as a phone call)
     * @author Scott Priddy
     * @see "Section 8.8 OFX Spec"
     */
    class OtherEnrollment {
        private message;
        /**
         * Message to consumer about what to do next (for example, a phone number),
         * @return String
         */
        getMessage(): string;
        setMessage(message: string): void;
    }
}
declare module ofx4js.domain.data.profile.info.signup {
    /**
     * Web Enrollment option containing URL to direct user for web based enrollment, if supported.
     * @author Scott Priddy
     * @see "Section 8.8 OFX Spec"
     */
    class WebEnrollment {
        private url;
        /**
         * URL to start enrollment process
         * @return String
         */
        getUrl(): string;
        setUrl(url: string): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ClientEnrollment = ofx4js.domain.data.profile.info.signup.ClientEnrollment;
    import OtherEnrollment = ofx4js.domain.data.profile.info.signup.OtherEnrollment;
    import WebEnrollment = ofx4js.domain.data.profile.info.signup.WebEnrollment;
    /**
     * Servers use the Signup Message Set Profile Information to define how enrollment should proceed.
     *
     * This aggregate should contain 1 Enrollment option among <CLIENTENROLL>, <WEBENROLL>, or <OTHERENROLL>.
     * todo: review how best to enforce this constraint
     *
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 8.8 OFX Spec"
     */
    class SignupV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private clientEnrollment;
        private webEnrollment;
        private otherEnrollment;
        private supportsClientUserInfoChanges;
        private supportsAvailableAccounts;
        private supportsClientServiceActivationRequests;
        getMessageSetType(): MessageSetType;
        getClientEnrollment(): ClientEnrollment;
        setClientEnrollment(clientEnrollment: ClientEnrollment): void;
        getWebEnrollment(): WebEnrollment;
        setWebEnrollment(webEnrollment: WebEnrollment): void;
        getOtherEnrollment(): OtherEnrollment;
        setOtherEnrollment(otherEnrollment: OtherEnrollment): void;
        /**
         * Y if server supports client-based user information changes,
         * @return Boolean
         */
        getSupportsClientUserInfoChanges(): boolean;
        setSupportsClientUserInfoChanges(supportsClientUserInfoChanges: boolean): void;
        /**
         * Y if server can provide information on accounts with SVCSTATUS available,
         * N means client should expect to ask user for specific account information
         * @return Boolean
         */
        getSupportsAvailableAccounts(): boolean;
        setSupportsAvailableAccounts(supportsAvailableAccounts: boolean): void;
        /**
         * Y if server allows clients to make service activation requests (<ACCTRQ>),
         * N if server will only advise clients via synchronization of service additions,
         * changes, or deletions.
         * @return Boolean
         */
        getSupportsClientServiceActivationRequests(): boolean;
        setSupportsClientServiceActivationRequests(supportsClientServiceActivationRequests: boolean): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class SignupMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): SignupV1MessageSetInfo;
        setVersion1Info(version1Info: SignupV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import ProcessorDayOff = ofx4js.domain.data.common.ProcessorDayOff;
    import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    /**
     * Wire Transfer Message Set Profile
     * @author Scott Priddy
     * @author Ryan Heaton
     * @see "Section 11.13.5 OFX Spec"
     */
    class WireTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {
        private processorDaysOff;
        private processEndTime;
        private supportsScheduledTransfers;
        private domesticWireTransferFee;
        private internationalWireTransferFee;
        getMessageSetType(): MessageSetType;
        getProcessorDaysOff(): Array<ProcessorDayOff>;
        setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void;
        getProcessEndTime(): string;
        setProcessEndTime(processEndTime: string): void;
        getSupportsScheduledTransfers(): boolean;
        setSupportsScheduledTransfers(supportsScheduledTransfers: boolean): void;
        getDomesticWireTransferFee(): number;
        setDomesticWireTransferFee(domesticWireTransferFee: number): void;
        getInternationalWireTransferFee(): number;
        setInternationalWireTransferFee(internationalWireTransferFee: number): void;
    }
}
declare module ofx4js.domain.data.profile.info {
    import AbstractMessageSetInfo = ofx4js.domain.data.profile.AbstractMessageSetInfo;
    /**
     * @author Ryan Heaton
     */
    class WireTransferMessageSetInfo extends AbstractMessageSetInfo {
        private version1Info;
        getVersion1Info(): WireTransferV1MessageSetInfo;
        setVersion1Info(version1Info: WireTransferV1MessageSetInfo): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Asset class for debt.
     * @see "Section 13.8.5.7, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum AssetClass {
        /**
         * Government or corporate bonds issued in the United States.
         */
        DOMESTIC_BOND = 0,
        /**
         * Government or corporate bonds issued in foreign countries or the United States.
         */
        INTL_BOND = 1,
        /**
         * Stocks for US companies with market caps of $2B or more.
         */
        LARGE_STOCK = 2,
        /**
         * Stocks for US companies with market caps of ~$100M to $2B.
         */
        SMALL_STOCK = 3,
        /**
         * Publicallt traded stocks for companies based in foreign countries.
         */
        INTL_STOCK = 4,
        /**
         * Stable, short-term investments which provide income that rises and falls with short-term
         * interest rates.
         */
        MONEY_MARKET = 5,
        /**
         * Investments which do not fit into any of the other types.
         */
        OTHER = 6,
    }
    function AssetClass_fromOfx(ofxVal: string): AssetClass;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Call type for debt.
     * @see "Section 13.8.5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum CallType {
        CALL = 0,
        PUT = 1,
        PREFUND = 2,
        MATURITY = 3,
    }
    function CallType_fromOfx(ofxVal: string): CallType;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Coupon freqency for debt.
     * @see "Section 13.8.5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum CouponFrequency {
        MONTHLY = 0,
        QUARTERLY = 1,
        SEMIANNUAL = 2,
        ANNUAL = 3,
        OTHER = 4,
    }
    function CouponFrequency_fromOfx(ofxVal: string): CouponFrequency;
}
declare module ofx4js.domain.data.seclist {
    /**
     * The class of debt.
     * @see "Section 13.8.5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum DebtClass {
        TREASURY = 0,
        MUNICIPAL = 1,
        CORPORATE = 2,
        OTHER = 3,
    }
    function DebtClass_fromOfx(ofxVal: string): DebtClass;
}
declare module ofx4js.domain.data.seclist {
    /**
     * The type of debt.
     * @see "Section 13.8.5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum DebtType {
        COUPON = 0,
        ZERO = 1,
    }
    function DebtType_fromOfx(ofxVal: string): DebtType;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Info about a debt security.
     * @see "Section 13.8.5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    class DebtSecurityInfo extends BaseSecurityInfo {
        private parValue;
        private debtType;
        private debtClass;
        private couponRate;
        private nextMaturityDate;
        private couponFrequency;
        private callPrice;
        private yieldToCall;
        private nextCallDate;
        private callType;
        private yieldToMaturity;
        private debtMaturityDate;
        private assetClass;
        private fiAssetClass;
        /**
         * Gets the par value of the debt. This is a required field according to the OFX spec.
         *
         * @return the par value of the debt
         */
        getParValue(): number;
        /**
         * Sets the par value of the debt. This is a required field according to the OFX spec.
         *
         * @param parValue the par value of the debt
         */
        setParValue(parValue: number): void;
        /**
         * Gets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
         * OFX spec.
         *
         * @return the type of debt
         */
        getDebtType(): string;
        /**
         * Sets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
         * OFX spec.
         *
         * @param debtType the type of debt
         */
        setDebtType(debtType: string): void;
        /**
         * Gets the type of debt as one of the well-known types.
         *
         * @return the type of debt or null if it's not one of the well-known types
         */
        getDebtTypeEnum(): DebtType;
        /**
         * Gets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
         * This is an optional field according to the OFX spec.
         *
         * @return the class of debt
         */
        getDebtClass(): string;
        /**
         * Sets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
         * This is an optional field according to the OFX spec.
         *
         * @param debtClass the class of debt
         */
        setDebtClass(debtClass: string): void;
        /**
         * Gets the class of debt as one of the well-known types.
         *
         * @return the class of debt or null if it's not one of the well-known types
         */
        getDebtClassEnum(): DebtClass;
        /**
         * Gets the coupon rate of the debt for the next closest call date.
         * This is an optional field according to the OFX spec.
         *
         * @return the coupon rate
         */
        getCouponRate(): number;
        /**
         * Sets the coupon rate of the debt for the next closest call date.
         * This is an optional field according to the OFX spec.
         *
         * @param couponRate the coupon rate
         */
        setCouponRate(couponRate: number): void;
        /**
         * Gets the next maturity date for the next coupon.
         * This is an optional field according to the OFX spec.
         *
         * @return the maturity date for the next coupon
         */
        getNextMaturityDate(): Date;
        /**
         * Sets the next maturity date for the next coupon.
         * This is an optional field according to the OFX spec.
         *
         * @param nextMaturityDate the maturity date for the next coupon.
         */
        setNextMaturityDate(nextMaturityDate: Date): void;
        /**
         * Gets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
         * This is an optional field according to the OFX spec.
         *
         * @return the coupon frequency
         */
        getCouponFrequency(): string;
        /**
         * Sets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
         * This is an optional field according to the OFX spec.
         *
         * @param couponFrequency the coupon frequency
         */
        setCouponFrequency(couponFrequency: string): void;
        /**
         * Gets the coupon frequency as one of the well-known types.
         *
         * @return the coupon frequency or null if it's not one of the well-known types
         */
        getCouponFrequencyEnum(): CouponFrequency;
        /**
         * Gets the bond price. This is an optional field according to the OFX spec.
         *
         * @return the bond price
         */
        getCallPrice(): number;
        /**
         * Sets the bond price. This is an optional field according to the OFX spec.
         *
         * @param callPrice the bond price
         */
        setCallPrice(callPrice: number): void;
        /**
         * Gets the yield to call as a rate. This is an optional field according to the OFX spec.
         *
         * @return the yield to call rate
         */
        getYieldToCall(): number;
        /**
         * Sets the yield to call as a rate. This is an optional field according to the OFX spec.
         *
         * @param yieldToCall the yield to call rate
         */
        setYieldToCall(yieldToCall: number): void;
        /**
         * Gets the next call date. This is an optional field according to the OFX spec.
         *
         * @return the next call date.
         */
        getNextCallDate(): Date;
        /**
         * Sets the next call date. This is an optional field according to the OFX spec.
         *
         * @param nextCallDate the next call date.
         */
        setNextCallDate(nextCallDate: Date): void;
        /**
         * Gets the type of call.
         *
         * @return the type of call
         */
        getCallType(): string;
        /**
         * Sets the type of call.
         *
         * @param callType the type of call
         */
        setCallType(callType: string): void;
        /**
         * Gets the type of call as one of the well-known types.
         *
         * @return the type of call or null if it's not one of the well-known types
         */
        getCallTypeEnum(): CallType;
        /**
         * Gets the yield to maturity as a rate. This is an optional field according to the OFX spec.
         *
         * @return the yield to call rate
         */
        getYieldToMaturity(): number;
        /**
         * Sets the yield to maturity as a rate. This is an optional field according to the OFX spec.
         *
         * @param yieldToMaturity the yield to call rate
         */
        setYieldToMaturity(yieldToMaturity: number): void;
        /**
         * Gets the date when the debt matures. This is an optional field according to the OFX spec.
         *
         * @return the date when the debt matures
         */
        getDebtMaturityDate(): Date;
        /**
         * Sets the date when the debt matures. This is an optional field according to the OFX spec.
         *
         * @param debtMaturityDate the date when the debt matures
         */
        setDebtMaturityDate(debtMaturityDate: Date): void;
        /**
         * Gets the asset class of the debt. This is an optional field according to the OFX spec.
         *
         * @return the asset class of the debt
         */
        getAssetClass(): string;
        /**
         * Sets the asset class of the debt. This is an optional field according to the OFX spec.
         *
         * @param assetClass the asset class of the debt
         */
        setAssetClass(assetClass: string): void;
        /**
         * Gets the assert class as one of the well-known types.
         *
         * @return the asset class or null if it's not one of the well-known types
         */
        getAssetClassEnum(): AssetClass;
        /**
         * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
         * spec.
         *
         * @return the FI-defined asset class of the debt
         */
        getFiAssetClass(): string;
        /**
         * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
         * spec.
         *
         * @param fiAssetClass the FI-defined asset class of the debt
         */
        setFiAssetClass(fiAssetClass: string): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * The type of mutual fund.
     * @see "Section 13.8.5.2, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum MutualFundType {
        OPEN_END = 0,
        CLOSE_END = 1,
        OTHER = 2,
    }
    function MutualFundType_fromOfx(ofxVal: string): MutualFundType;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Info about a mutual fund security.
     * @see "Section 13.8.5.3, OFX Spec"
     *
     * @author Jon Perlow
     */
    class MutualFundSecurityInfo extends BaseSecurityInfo {
        private mfType;
        private yield;
        private dateYieldAsOf;
        /**
         * Gets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
         * according to the OFX spec.
         *
         * @return the mutual fund type
         */
        getType(): string;
        /**
         * Sets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
         * according to the OFX spec.
         *
         * @param mfType the mutual fund type
         */
        setType(mfType: string): void;
        /**
         * Gets the mutual fund type as one of the well-known types.
         *
         * @return the mutual fund type or null if it's not one of the well-known types
         */
        getTypeEnum(): MutualFundType;
        /**
         * Gets the yield as a rate. This is an optional field according to the OFX spec.
         *
         * @return the yield as a rate
         */
        getYield(): number;
        /**
         * Sets the yield as a rate. This is an optional field according to the OFX spec.
         *
         * @param yield the yield as a rate
         */
        setYield(yield_: number): void;
        /**
         * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
         *
         * @return the as-of date for the yield
         */
        getDateYieldAsOf(): Date;
        /**
         * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
         *
         * @param dateYieldAsOf the as-of date for the yield
         */
        setDateYieldAsOf(dateYieldAsOf: Date): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Type of option.
     * @see "Section 13.8.5.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum OptionType {
        PUT = 0,
        CALL = 1,
    }
    function OptionType_fromOfx(ofxVal: string): OptionType;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Info about an option security.
     * @see "Section 13.8.5.4, OFX Spec"
     *
     * @author Jon Perlow
     */
    class OptionSecurityInfo extends BaseSecurityInfo {
        private optionType;
        private strikePrice;
        private expirationDate;
        private sharesPerContact;
        private underlyingSecurity;
        private assetClass;
        private fiAssetClass;
        /**
         * Gets the type of option. One of "PUT" or "CALL". This is a required field according to the
         * OFX spec.
         *
         * @return the option type
         */
        getOptionType(): string;
        /**
         * Sets the type of option. One of "PUT" or "CALL". This is a required field according to the
         * OFX spec.
         *
         * @param optionType the option type
         */
        setOptionType(optionType: string): void;
        /**
         * Gets the option type as a well-known enum value.
         *
         * @return the option type or null if it's not one of the well-known types
         */
        getOptionTypeEnum(): OptionType;
        /**
         * Gets the strike price of the option. This is a required field according to the OFX spec.
         *
         * @return the option strike price
         */
        getStrikePrice(): number;
        /**
         * Sets the strike price of the option. This is a required field according to the OFX spec.
         *
         * @param strikePrice the option strike price
         */
        setStrikePrice(strikePrice: number): void;
        /**
         * Gets the expiration date of the option. This is a required field according to the OFX spec.
         *
         * @return the expiration date of the option
         */
        getExpirationDate(): Date;
        /**
         * Sets the expiration date of the option. This is a required field according to the OFX spec.
         *
         * @param expirationDate the expiration date of the option
         */
        setExpirationDate(expirationDate: Date): void;
        /**
         * Gets the number of shares per option contact. This is a required field according to the OFX
         * spec.
         *
         * @return the number of shares per option contact
         */
        getSharesPerContact(): number;
        /**
         * Sets the number of shares per option contact. This is a required field according to the OFX
         * spec.
         *
         * @param sharesPerContact the number of shares per option contact
         */
        setSharesPerContact(sharesPerContact: number): void;
        /**
         * Gets the security id of the underling security. This is an optional field according to the OFX
         * spec.
         *
         * @return the security id of the underlying security
         */
        getUnderlyingSecurity(): SecurityId;
        /**
         * Sets the security id of the underling security. This is an optional field according to the OFX
         * spec.
         *
         * @param underlyingSecurity the security id of the underlying security
         */
        setUnderlyingSecurity(underlyingSecurity: SecurityId): void;
        /**
         * Gets the asset class of the option. This is an optional field according to the OFX spec.
         *
         * @return the asset class of the option
         */
        getAssetClass(): string;
        /**
         * Sets the asset class of the option. This is an optional field according to the OFX spec.
         *
         * @param assetClass the asset class of the option
         */
        setAssetClass(assetClass: string): void;
        /**
         * Gets the assert class as one of the well-known types.
         *
         * @return the asset class or null if it's not one of the well-known types
         */
        getAssetClassEnum(): AssetClass;
        /**
         * Gets the FI-defined asset class of the option. This is an optional field according to the OFX
         * spec.
         *
         * @return the FI-defined asset class of the option
         */
        getFiAssetClass(): string;
        /**
         * Sets the FI-defined asset class of the option. This is an optional field according to the OFX
         * spec.
         *
         * @param fiAssetClass the FI-defined asset class of the option
         */
        setFiAssetClass(fiAssetClass: string): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * Info about any other type of security.
     * @see "Section 13.8.5.5, OFX Spec"
     *
     * @author Jon Perlow
     */
    class OtherSecurityInfo extends BaseSecurityInfo {
        private typeDesc;
        private assetClass;
        private fiAssetClass;
        /**
         * Gets a description of the type of security. This is an optional field according to the OFX
         * spec.
         *
         * @return the description of the security
         */
        getTypeDesc(): string;
        /**
         * Sets a description of the type of security. This is an optional field according to the OFX
         * spec.
         *
         * @param typeDesc the description of the security
         */
        setTypeDesc(typeDesc: string): void;
        /**
         * Gets the asset class of the option. This is an optional field according to the OFX spec.
         *
         * @return the asset class of the debt
         */
        getAssetClass(): string;
        /**
         * Sets the asset class of the debt. This is an optional field according to the OFX spec.
         *
         * @param assetClass the asset class of the debt
         */
        setAssetClass(assetClass: string): void;
        /**
         * Gets the assert class as one of the well-known types.
         *
         * @return the asset class or null if it's not one of the well-known types
         */
        getAssetClassEnum(): AssetClass;
        /**
         * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
         * spec.
         *
         * @return the FI-defined asset class of the debt
         */
        getFiAssetClass(): string;
        /**
         * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
         * spec.
         *
         * @param fiAssetClass the FI-defined asset class of the debt
         */
        setFiAssetClass(fiAssetClass: string): void;
    }
}
declare module ofx4js.domain.data.seclist {
    /**
     * The type of debt.
     * @see "Section 13.8.5.6, OFX Spec"
     *
     * @author Jon Perlow
     */
    enum StockType {
        COMMON = 0,
        PREFERRED = 1,
        CONVERTIBLE = 2,
        OTHER = 3,
    }
    function StockType_fromOfx(ofxVal: string): StockType;
}
declare module ofx4js.domain.data.seclist {
    /**
     * Info about a stock security.
     * @see "Section 13.8.5.6, OFX Spec"
     *
     * @author Jon Perlow
     */
    class StockSecurityInfo extends BaseSecurityInfo {
        private stockType;
        private yield;
        private dateYieldAsOf;
        private assetClass;
        private fiAssetClass;
        /**
         * Gets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
         * optional field according to the OFX spec.
         *
         * @return the type of stock
         */
        getType(): string;
        /**
         * Sets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
         * optional field according to the OFX spec.
         *
         * @param stockType the type of stock
         */
        setType(stockType: string): void;
        /**
         * Gets the type of stock as one of the well-known types.
         *
         * @return the type of stock or null if it's not one of the well-known types
         */
        getTypeEnum(): StockType;
        /**
         * Gets the current yield reported as the dividend expressed as a portion of the current stock
         * price, a rate. This is an optional field according to the OFX spec.
         *
         * @return the dividend yield
         */
        getYield(): number;
        /**
         * Sets the current yield reported as the dividend expressed as a portion of the current stock
         * price, a rate. This is an optional field according to the OFX spec.
         *
         * @param yield the dividend yield
         */
        setYield(yield_: number): void;
        /**
         * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
         *
         * @return the as-of date for the yield
         */
        getDateYieldAsOf(): Date;
        /**
         * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
         *
         * @param dateYieldAsOf the as-of date for the yield
         */
        setDateYieldAsOf(dateYieldAsOf: Date): void;
        /**
         * Gets the asset class of the stock. This is an optional field according to the OFX spec.
         *
         * @return the asset class of the stock
         */
        getAssetClass(): string;
        /**
         * Sets the asset class of the stock. This is an optional field according to the OFX spec.
         *
         * @param assetClass the asset class of the stock
         */
        setAssetClass(assetClass: string): void;
        /**
         * Gets the assert class as one of the well-known types.
         *
         * @return the asset class or null if it's not one of the well-known types
         */
        getAssetClassEnum(): AssetClass;
        /**
         * Gets the FI-defined asset class of the stock. This is an optional field according to the OFX
         * spec.
         *
         * @return the FI-defined asset class of the stock
         */
        getFiAssetClass(): string;
        /**
         * Sets the FI-defined asset class of the stock. This is an optional field according to the OFX
         * spec.
         *
         * @param fiAssetClass the FI-defined asset class of the stock
         */
        setFiAssetClass(fiAssetClass: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class ProcDet {
        private dtAqd;
        private dtSale;
        private secName;
        private costBasis;
        private saleSpr;
        private longShort;
        private wasDisAllowed;
        private noncoveredSec;
        private basisNotshown;
        /**
         * @return the dtAqd
         */
        getDtAqd(): string;
        /**
         * @param dtAqd the dtAqd to set
         */
        setDtAqd(dtAqd: string): void;
        /**
         * @return the dtSale
         */
        getDtSale(): string;
        /**
         * @param dtSale the dtSale to set
         */
        setDtSale(dtSale: string): void;
        /**
         * @return the secName
         */
        getSecName(): string;
        /**
         * @param secName the secName to set
         */
        setSecName(secName: string): void;
        /**
         * @return the costBasis
         */
        getCostBasis(): string;
        /**
         * @param costBasis the costBasis to set
         */
        setCostBasis(costBasis: string): void;
        /**
         * @return the saleSpr
         */
        getSaleSpr(): string;
        /**
         * @param saleSpr the saleSpr to set
         */
        setSaleSpr(saleSpr: string): void;
        /**
         * @return the longShort
         */
        getLongShort(): string;
        /**
         * @param longShort the longShort to set
         */
        setLongShort(longShort: string): void;
        /**
         * @return the wasDisAllowed
         */
        getWasDisAllowed(): string;
        /**
         * @param wasDisAllowed the wasDisAllowed to set
         */
        setWasDisAllowed(wasDisAllowed: string): void;
        /**
         * @return the noncoveredSec
         */
        getNoncoveredSec(): string;
        /**
         * @param noncoveredSec the noncoveredSec to set
         */
        setNoncoveredSec(noncoveredSec: string): void;
        /**
         * @return the basisNotshown
         */
        getBasisNotshown(): string;
        /**
         * @param basisNotshown the basisNotshown to set
         */
        setBasisNotshown(basisNotshown: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class ExtDBInfo {
        private procDet;
        private teInterest;
        private pabInterest;
        private teIntDividend;
        private pabDividend;
        /**
         * @return the procDet
         */
        getProcDet(): Array<ProcDet>;
        /**
         * @param procDet the procDet to set
         */
        setProcDet(procDet: Array<ProcDet>): void;
        /**
         * @return the teInterest
         */
        getTeInterest(): string;
        /**
         * @param teInterest the teInterest to set
         */
        setTeInterest(teInterest: string): void;
        /**
         * @return the pabInterest
         */
        getPabInterest(): string;
        /**
         * @param pabInterest the pabInterest to set
         */
        setPabInterest(pabInterest: string): void;
        /**
         * @return the teIntDividend
         */
        getTeIntDividend(): string;
        /**
         * @param teIntDividend the teIntDividend to set
         */
        setTeIntDividend(teIntDividend: string): void;
        /**
         * @return the pabDividend
         */
        getPabDividend(): string;
        /**
         * @param pabDividend the pabDividend to set
         */
        setPabDividend(pabDividend: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class PayerAddress {
        private payerName1;
        private payerName2;
        private address1;
        private address2;
        private city;
        private state;
        private postalCode;
        private phone;
        /**
         * @return the payerName1
         */
        getPayerName1(): string;
        /**
         * @param payerName1 the payerName1 to set
         */
        setPayerName1(payerName1: string): void;
        /**
         * @return the payerName2
         */
        getPayerName2(): string;
        /**
         * @param payerName2 the payerName2 to set
         */
        setPayerName2(payerName2: string): void;
        /**
         * @return the address1
         */
        getAddress1(): string;
        /**
         * @param address1 the address1 to set
         */
        setAddress1(address1: string): void;
        /**
         * @return the address2
         */
        getAddress2(): string;
        /**
         * @param address2 the address2 to set
         */
        setAddress2(address2: string): void;
        /**
         * @return the city
         */
        getCity(): string;
        /**
         * @param city the city to set
         */
        setCity(city: string): void;
        /**
         * @return the state
         */
        getState(): string;
        /**
         * @param state the state to set
         */
        setState(state: string): void;
        /**
         * @return the postalCode
         */
        getPostalCode(): string;
        /**
         * @param postalCode the postalCode to set
         */
        setPostalCode(postalCode: string): void;
        /**
         * @return the phone
         */
        getPhone(): string;
        /**
         * @param phone the phone to set
         */
        setPhone(phone: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class RecAddress {
        private recName1;
        private recName2;
        private address1;
        private address2;
        private city;
        private state;
        private postalCode;
        private phone;
        /**
         * @return the recName1
         */
        getRecName1(): string;
        /**
         * @param recName1 the recName1 to set
         */
        setRecName1(recName1: string): void;
        /**
         * @return the recName2
         */
        getRecName2(): string;
        /**
         * @param recName2 the recName2 to set
         */
        setRecName2(recName2: string): void;
        /**
         * @return the address1
         */
        getAddress1(): string;
        /**
         * @param address1 the address1 to set
         */
        setAddress1(address1: string): void;
        /**
         * @return the address2
         */
        getAddress2(): string;
        /**
         * @param address2 the address2 to set
         */
        setAddress2(address2: string): void;
        /**
         * @return the city
         */
        getCity(): string;
        /**
         * @param city the city to set
         */
        setCity(city: string): void;
        /**
         * @return the state
         */
        getState(): string;
        /**
         * @param state the state to set
         */
        setState(state: string): void;
        /**
         * @return the postalCode
         */
        getPostalCode(): string;
        /**
         * @param postalCode the postalCode to set
         */
        setPostalCode(postalCode: string): void;
        /**
         * @return the phone
         */
        getPhone(): string;
        /**
         * @param phone the phone to set
         */
        setPhone(phone: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099B {
        private srvrtId;
        private taxYear;
        private extDBInfo;
        private payerAddress;
        private payerId;
        private recAddress;
        private recId;
        private recAcct;
        getSrvrtId(): string;
        setSrvrtId(srvrtId: string): void;
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        /**
         * @return the extDBInfo
         */
        getExtDBInfo(): ExtDBInfo;
        /**
         * @param extDBInfo the extDBInfo to set
         */
        setExtDBInfo(extDBInfo: ExtDBInfo): void;
        /**
         * @return the payerAddress
         */
        getPayerAddress(): PayerAddress;
        /**
         * @param payerAddress the payerAddress to set
         */
        setPayerAddress(payerAddress: PayerAddress): void;
        /**
         * @return the payerId
         */
        getPayerId(): string;
        /**
         * @param payerId the payerId to set
         */
        setPayerId(payerId: string): void;
        /**
         * @return the recAddress
         */
        getRecAddress(): RecAddress;
        /**
         * @param recAddress the recAddress to set
         */
        setRecAddress(recAddress: RecAddress): void;
        /**
         * @return the recId
         */
        getRecId(): string;
        /**
         * @param recId the recId to set
         */
        setRecId(recId: string): void;
        /**
         * @return the recAcct
         */
        getRecAcct(): string;
        /**
         * @param recAcct the recAcct to set
         */
        setRecAcct(recAcct: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099DIV {
        private srvrtId;
        private taxYear;
        private ordDiv;
        private qualifiedDiv;
        private totCapGain;
        private p28Gain;
        private unrecSec1250;
        private sec1202;
        private nonTaxDist;
        private fedTaxWh;
        private investExp;
        private forTaxPd;
        private cashLiq;
        private nonCashLiq;
        private payerAddress;
        private payerId;
        private recAddress;
        private recId;
        private recAcct;
        getSrvrtId(): string;
        setSrvrtId(srvrtId: string): void;
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        /**
         * @return the ordDiv
         */
        getOrdDiv(): string;
        /**
         * @param ordDiv the ordDiv to set
         */
        setOrdDiv(ordDiv: string): void;
        /**
         * @return the qualifiedDiv
         */
        getQualifiedDiv(): string;
        /**
         * @param qualifiedDiv the qualifiedDiv to set
         */
        setQualifiedDiv(qualifiedDiv: string): void;
        /**
         * @return the totCapGain
         */
        getTotCapGain(): string;
        /**
         * @param totCapGain the totCapGain to set
         */
        setTotCapGain(totCapGain: string): void;
        /**
         * @return the p28Gain
         */
        getP28Gain(): string;
        /**
         * @param p28Gain the p28Gain to set
         */
        setP28Gain(p28Gain: string): void;
        /**
         * @return the unrecSec1250
         */
        getUnrecSec1250(): string;
        /**
         * @param unrecSec1250 the unrecSec1250 to set
         */
        setUnrecSec1250(unrecSec1250: string): void;
        /**
         * @return the sec1202
         */
        getSec1202(): string;
        /**
         * @param sec1202 the sec1202 to set
         */
        setSec1202(sec1202: string): void;
        /**
         * @return the nonTaxDist
         */
        getNonTaxDist(): string;
        /**
         * @param nonTaxDist the nonTaxDist to set
         */
        setNonTaxDist(nonTaxDist: string): void;
        /**
         * @return the fedTaxWh
         */
        getFedTaxWh(): string;
        /**
         * @param fedTaxWh the fedTaxWh to set
         */
        setFedTaxWh(fedTaxWh: string): void;
        /**
         * @return the investExp
         */
        getInvestExp(): string;
        /**
         * @param investExp the investExp to set
         */
        setInvestExp(investExp: string): void;
        /**
         * @return the forTaxPd
         */
        getForTaxPd(): string;
        /**
         * @param forTaxPd the forTaxPd to set
         */
        setForTaxPd(forTaxPd: string): void;
        /**
         * @return the cashLiq
         */
        getCashLiq(): string;
        /**
         * @param cashLiq the cashLiq to set
         */
        setCashLiq(cashLiq: string): void;
        /**
         * @return the nonCashLiq
         */
        getNonCashLiq(): string;
        /**
         * @param nonCashLiq the nonCashLiq to set
         */
        setNonCashLiq(nonCashLiq: string): void;
        /**
         * @return the payerAddress
         */
        getPayerAddress(): PayerAddress;
        /**
         * @param payerAddress the payerAddress to set
         */
        setPayerAddress(payerAddress: PayerAddress): void;
        /**
         * @return the payerId
         */
        getPayerId(): string;
        /**
         * @param payerId the payerId to set
         */
        setPayerId(payerId: string): void;
        /**
         * @return the recAddress
         */
        getRecAddress(): RecAddress;
        /**
         * @param recAddress the recAddress to set
         */
        setRecAddress(recAddress: RecAddress): void;
        /**
         * @return the recId
         */
        getRecId(): string;
        /**
         * @param recId the recId to set
         */
        setRecId(recId: string): void;
        /**
         * @return the recAcct
         */
        getRecAcct(): string;
        /**
         * @param recAcct the recAcct to set
         */
        setRecAcct(recAcct: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import PayerAddress = ofx4js.domain.data.tax1099.PayerAddress;
    import RecAddress = ofx4js.domain.data.tax1099.RecAddress;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099INT {
        private srvrtId;
        private taxYear;
        private intIncome;
        private erlWithPen;
        private intUsbndtrs;
        private fedTaxWh;
        private investExp;
        private forTaxPd;
        private payerAddress;
        private payerId;
        private recAddress;
        private recId;
        private recAcct;
        private taxExemptInt;
        private specifiedPabInt;
        getSrvrtId(): string;
        setSrvrtId(srvrtId: string): void;
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        /**
         * @return the intIncome
         */
        getIntIncome(): string;
        /**
         * @param intIncome the intIncome to set
         */
        setIntIncome(intIncome: string): void;
        /**
         * @return the erlWithPen
         */
        getErlWithPen(): string;
        /**
         * @param erlWithPen the erlWithPen to set
         */
        setErlWithPen(erlWithPen: string): void;
        /**
         * @return the intUsbndtrs
         */
        getIntUsbndtrs(): string;
        /**
         * @param intUsbndtrs the intUsbndtrs to set
         */
        setIntUsbndtrs(intUsbndtrs: string): void;
        /**
         * @return the fedTaxWh
         */
        getFedTaxWh(): string;
        /**
         * @param fedTaxWh the fedTaxWh to set
         */
        setFedTaxWh(fedTaxWh: string): void;
        /**
         * @return the investExp
         */
        getInvestExp(): string;
        /**
         * @param investExp the investExp to set
         */
        setInvestExp(investExp: string): void;
        /**
         * @return the forTaxPd
         */
        getForTaxPd(): string;
        /**
         * @param forTaxPd the forTaxPd to set
         */
        setForTaxPd(forTaxPd: string): void;
        /**
         * @return the payerAddress
         */
        getPayerAddress(): PayerAddress;
        /**
         * @param payerAddress the payerAddress to set
         */
        setPayerAddress(payerAddress: PayerAddress): void;
        /**
         * @return the payerId
         */
        getPayerId(): string;
        /**
         * @param payerId the payerId to set
         */
        setPayerId(payerId: string): void;
        /**
         * @return the recAddress
         */
        getRecAddress(): RecAddress;
        /**
         * @param recAddress the recAddress to set
         */
        setRecAddress(recAddress: RecAddress): void;
        /**
         * @return the recId
         */
        getRecId(): string;
        /**
         * @param recId the recId to set
         */
        setRecId(recId: string): void;
        /**
         * @return the recAcct
         */
        getRecAcct(): string;
        /**
         * @param recAcct the recAcct to set
         */
        setRecAcct(recAcct: string): void;
        /**
         * @return the taxExemptInt
         */
        getTaxExemptInt(): string;
        /**
         * @param taxExemptInt the taxExemptInt to set
         */
        setTaxExemptInt(taxExemptInt: string): void;
        /**
         * @return the specifiedPabInt
         */
        getSpecifiedPabInt(): string;
        /**
         * @param specifiedPabInt the specifiedPabInt to set
         */
        setSpecifiedPabInt(specifiedPabInt: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099MISC {
        private srvrtId;
        private taxYear;
        private royalties;
        private otherIncome;
        private fedTaxWh;
        private subPmts;
        private payerAddress;
        private payerId;
        private recAddress;
        private recId;
        private recAcct;
        getSrvrtId(): string;
        setSrvrtId(srvrtId: string): void;
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        /**
         * @return the royalties
         */
        getRoyalties(): string;
        /**
         * @param royalties the royalties to set
         */
        setRoyalties(royalties: string): void;
        /**
         * @return the otherIncome
         */
        getOtherIncome(): string;
        /**
         * @param otherIncome the otherIncome to set
         */
        setOtherIncome(otherIncome: string): void;
        /**
         * @return the fedTaxWh
         */
        getFedTaxWh(): string;
        /**
         * @param fedTaxWh the fedTaxWh to set
         */
        setFedTaxWh(fedTaxWh: string): void;
        /**
         * @return the subPmts
         */
        getSubPmts(): string;
        /**
         * @param subPmts the subPmts to set
         */
        setSubPmts(subPmts: string): void;
        /**
         * @return the payerAddress
         */
        getPayerAddress(): PayerAddress;
        /**
         * @param payerAddress the payerAddress to set
         */
        setPayerAddress(payerAddress: PayerAddress): void;
        /**
         * @return the payerId
         */
        getPayerId(): string;
        /**
         * @param payerId the payerId to set
         */
        setPayerId(payerId: string): void;
        /**
         * @return the recAddress
         */
        getRecAddress(): RecAddress;
        /**
         * @param recAddress the recAddress to set
         */
        setRecAddress(recAddress: RecAddress): void;
        /**
         * @return the recId
         */
        getRecId(): string;
        /**
         * @param recId the recId to set
         */
        setRecId(recId: string): void;
        /**
         * @return the recAcct
         */
        getRecAcct(): string;
        /**
         * @param recAcct the recAcct to set
         */
        setRecAcct(recAcct: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099OID {
        private srvrtId;
        private taxYear;
        private originalDisc;
        private otherPerInt;
        private erlWithPen;
        private fedTaxWh;
        private desc;
        private oidOnUstres;
        private investExp;
        private payerAddress;
        private payerId;
        private recAddress;
        private recId;
        private recAcct;
        getSrvrtId(): string;
        setSrvrtId(srvrtId: string): void;
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        /**
         * @return the originalDisc
         */
        getOriginalDisc(): string;
        /**
         * @param originalDisc the originalDisc to set
         */
        setOriginalDisc(originalDisc: string): void;
        /**
         * @return the otherPerInt
         */
        getOtherPerInt(): string;
        /**
         * @param otherPerInt the otherPerInt to set
         */
        setOtherPerInt(otherPerInt: string): void;
        /**
         * @return the erlWithPen
         */
        getErlWithPen(): string;
        /**
         * @param erlWithPen the erlWithPen to set
         */
        setErlWithPen(erlWithPen: string): void;
        /**
         * @return the fedTaxWh
         */
        getFedTaxWh(): string;
        /**
         * @param fedTaxWh the fedTaxWh to set
         */
        setFedTaxWh(fedTaxWh: string): void;
        /**
         * @return the desc
         */
        getDesc(): string;
        /**
         * @param desc the desc to set
         */
        setDesc(desc: string): void;
        /**
         * @return the oidOnUstres
         */
        getOidOnUstres(): string;
        /**
         * @param oidOnUstres the oidOnUstres to set
         */
        setOidOnUstres(oidOnUstres: string): void;
        /**
         * @return the investExp
         */
        getInvestExp(): string;
        /**
         * @param investExp the investExp to set
         */
        setInvestExp(investExp: string): void;
        /**
         * @return the payerAddress
         */
        getPayerAddress(): PayerAddress;
        /**
         * @param payerAddress the payerAddress to set
         */
        setPayerAddress(payerAddress: PayerAddress): void;
        /**
         * @return the payerId
         */
        getPayerId(): string;
        /**
         * @param payerId the payerId to set
         */
        setPayerId(payerId: string): void;
        /**
         * @return the recAddress
         */
        getRecAddress(): RecAddress;
        /**
         * @param recAddress the recAddress to set
         */
        setRecAddress(recAddress: RecAddress): void;
        /**
         * @return the recId
         */
        getRecId(): string;
        /**
         * @param recId the recId to set
         */
        setRecId(recId: string): void;
        /**
         * @return the recAcct
         */
        getRecAcct(): string;
        /**
         * @param recAcct the recAcct to set
         */
        setRecAcct(recAcct: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099R {
        private srvrtId;
        private taxYear;
        private grossDist;
        private taxAmt;
        private taxAmtNd;
        private capGain;
        private fedTaxWh;
        private empContins;
        private netUnapEmp;
        private distCode;
        private iraSepSimp;
        private annCtrctDist;
        private totEmpCount;
        private payerAddress;
        private payerId;
        private recAddress;
        private recId;
        private recAcct;
        getSrvrtId(): string;
        setSrvrtId(srvrtId: string): void;
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        /**
           * @return the grossDist
           */
        getGrossDist(): string;
        /**
         * @param grossDist the grossDist to set
         */
        setGrossDist(grossDist: string): void;
        /**
         * @return the taxAmt
         */
        getTaxAmt(): string;
        /**
         * @param taxAmt the taxAmt to set
         */
        setTaxAmt(taxAmt: string): void;
        /**
         * @return the taxAmtNd
         */
        getTaxAmtNd(): string;
        /**
         * @param taxAmtNd the taxAmtNd to set
         */
        setTaxAmtNd(taxAmtNd: string): void;
        /**
         * @return the capGain
         */
        getCapGain(): string;
        /**
         * @param capGain the capGain to set
         */
        setCapGain(capGain: string): void;
        /**
         * @return the fedTaxWh
         */
        getFedTaxWh(): string;
        /**
         * @param fedTaxWh the fedTaxWh to set
         */
        setFedTaxWh(fedTaxWh: string): void;
        /**
         * @return the empContins
         */
        getEmpContins(): string;
        /**
         * @param empContins the empContins to set
         */
        setEmpContins(empContins: string): void;
        /**
         * @return the netUnapEmp
         */
        getNetUnapEmp(): string;
        /**
         * @param netUnapEmp the netUnapEmp to set
         */
        setNetUnapEmp(netUnapEmp: string): void;
        /**
         * @return the distCode
         */
        getDistCode(): string;
        /**
         * @param distCode the distCode to set
         */
        setDistCode(distCode: string): void;
        /**
         * @return the iraSepSimp
         */
        getIraSepSimp(): string;
        /**
         * @param iraSepSimp the iraSepSimp to set
         */
        setIraSepSimp(iraSepSimp: string): void;
        /**
         * @return the annCtrctDist
         */
        getAnnCtrctDist(): string;
        /**
         * @param annCtrctDist the annCtrctDist to set
         */
        setAnnCtrctDist(annCtrctDist: string): void;
        /**
         * @return the totEmpCount
         */
        getTotEmpCount(): string;
        /**
         * @param totEmpCount the totEmpCount to set
         */
        setTotEmpCount(totEmpCount: string): void;
        /**
         * @return the payerAddress
         */
        getPayerAddress(): PayerAddress;
        /**
         * @param payerAddress the payerAddress to set
         */
        setPayerAddress(payerAddress: PayerAddress): void;
        /**
         * @return the payerId
         */
        getPayerId(): string;
        /**
         * @param payerId the payerId to set
         */
        setPayerId(payerId: string): void;
        /**
         * @return the recAddress
         */
        getRecAddress(): RecAddress;
        /**
         * @param recAddress the recAddress to set
         */
        setRecAddress(recAddress: RecAddress): void;
        /**
         * @return the recId
         */
        getRecId(): string;
        /**
         * @param recId the recId to set
         */
        setRecId(recId: string): void;
        /**
         * @return the recAcct
         */
        getRecAcct(): string;
        /**
         * @param recAcct the recAcct to set
         */
        setRecAcct(recAcct: string): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import T1099Request = ofx4js.domain.data.common.T1099Request;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099Request extends T1099Request {
        getTaxYear(): string;
        setTaxYear(taxYear: string): void;
        private taxYear;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099RequestTransaction extends TransactionWrappedRequestMessage<Tax1099Request> {
        private tax1099Request;
        /**
         * The tax1099Request.
         *
         * @return The tax1099Request.
         */
        getTax1099Request(): Tax1099Request;
        /**
         * The tax1099Request.
         *
         * @param tax1099Request The message.
         *
         */
        setTax1099Request(tax1099Request: Tax1099Request): void;
        setWrappedMessage(tax1099Request: Tax1099Request): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
    import RequestMessage = ofx4js.domain.data.RequestMessage;
    /**
     * @author aparna.gawali
     * aparna.gawali@sungard.com
     *
     */
    class Tax1099RequestMessageSet extends RequestMessageSet {
        private taxRequestTransaction;
        getType(): MessageSetType;
        /**
         * The statement request.
         *
         * @return The statement request.
         */
        getTaxRequestTransaction(): Tax1099RequestTransaction;
        /**
         * The statement request.
         *
         * @param taxRequestTransaction The statement request.
         */
        setTaxRequestTransaction(taxRequestTransaction: Tax1099RequestTransaction): void;
        getRequestMessages(): Array<RequestMessage>;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import T1099Response = ofx4js.domain.data.common.T1099Response;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099Response extends T1099Response {
        private lstTax1099DIV;
        private lstTax1099INT;
        private lstTax1099R;
        private lstTax1099B;
        private lstTax1099MISC;
        private lstTax1099OID;
        /**
         * @return the lstTax1099DIV
         */
        getLstTax1099DIV(): Array<Tax1099DIV>;
        /**
         * @param lstTax1099DIV
         *            the lstTax1099DIV to set
         */
        setLstTax1099DIV(lstTax1099DIV: Array<Tax1099DIV>): void;
        getResponseMessageName(): string;
        /**
         * @return the lstTax1099INT
         */
        getLstTax1099INT(): Array<Tax1099INT>;
        /**
         * @param lstTax1099INT the lstTax1099INT to set
         */
        setLstTax1099INT(lstTax1099INT: Array<Tax1099INT>): void;
        /**
         * @return the lstTax1099R
         */
        getLstTax1099R(): Array<Tax1099R>;
        /**
         * @param lstTax1099R the lstTax1099R to set
         */
        setLstTax1099R(lstTax1099R: Array<Tax1099R>): void;
        /**
         * @return the lstTax1099B
         */
        getLstTax1099B(): Array<Tax1099B>;
        /**
         * @param lstTax1099B the lstTax1099B to set
         */
        setLstTax1099B(lstTax1099B: Array<Tax1099B>): void;
        /**
         * @return the lstTax1099MISC
         */
        getLstTax1099MISC(): Array<Tax1099MISC>;
        /**
         * @param lstTax1099MISC the lstTax1099MISC to set
         */
        setLstTax1099MISC(lstTax1099MISC: Array<Tax1099MISC>): void;
        /**
         * @return the lstTax1099OID
         */
        getLstTax1099OID(): Array<Tax1099OID>;
        /**
         * @param lstTax1099OID the lstTax1099OID to set
         */
        setLstTax1099OID(lstTax1099OID: Array<Tax1099OID>): void;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099ResponseTransaction extends TransactionWrappedResponseMessage<Tax1099Response> {
        private tax1099Response;
        /**
         * The tax1099Response.
         *
         * @return The tax1099Response.
         */
        getTax1099Response(): Tax1099Response;
        /**
         * The tax1099Response.
         *
         * @param tax1099Response The message.
         */
        setTax1099Response(tax1099Response: Tax1099Response): void;
        getWrappedMessage(): Tax1099Response;
    }
}
declare module ofx4js.domain.data.tax1099 {
    import MessageSetType = ofx4js.domain.data.MessageSetType;
    import ResponseMessage = ofx4js.domain.data.ResponseMessage;
    import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
    /**
     * @author Aparna Gawali
     * aparna.gawali@sungard.com
     */
    class Tax1099ResponseMessageSet extends ResponseMessageSet {
        private taxResponseTransaction;
        getType(): MessageSetType;
        /**
         * The taxResponseTransaction list.
         *
         * Most OFX files have a single statement response, except MT2OFX
         * which outputs OFX with multiple statement responses
         * in a single banking response message set.
         *
         * @return The taxResponseTransaction list.
         */
        getTaxResponseTransaction(): Array<Tax1099ResponseTransaction>;
        /**
         * The taxResponseTransaction.
         *
         * @param taxResponseTransaction The statement responses.
         */
        setTaxResponseTransaction(taxResponseTransaction: Tax1099ResponseTransaction | Array<Tax1099ResponseTransaction>): void;
        getResponseMessages(): Array<ResponseMessage>;
        /**
         * The first statement response.
         *
         * @return the first bank statement response.
         * @deprecated Use getStatementResponses() because sometimes there are multiple responses
         */
        getStatementResponse(): Tax1099ResponseTransaction;
    }
}
declare module ofx4js {
    interface dummy {
    }
}
declare var module: any;
declare module ofx4js.io {
    /**
     * An OFX aggregate is just an aggregate of name-value pairs that identify the elements and element values of the aggregate.
     * The element values can strings or another (sub)aggregate.  The implementation of a
     *
     * @author Ryan Heaton
     */
    interface OFXAggregate {
        /**
         * The name of the OFX aggregate.
         *
         * @return The name of the aggregate.
         */
        getName(): string;
        /**
         * Whether this aggregate contains the specified element.
         *
         * @param elementName The name of the element.
         * @return Whether this aggregate contains the specified element.
         */
        containsElement(elementName: string): boolean;
        /**
         * The element names of this aggregate.
         *
         * @return The element names of this aggregate.
         */
        elementNames(): Array<string>;
        /**
         * The value of the element.  This will be either a string or another OFXAggregate.
         *
         * @param elementName The name of the element.
         * @return The value of the specified element.
         */
        getElementValue(elementName: string): Object;
    }
}
declare module ofx4js.io {
    import OFXRuntimeException = ofx4js.OFXRuntimeException;
    /**
     * Thrown when a required attribute of an aggregate is null or empty.
     *
     * @author Ryan Heaton
     */
    class RequiredAttributeException extends OFXRuntimeException {
        constructor(message: string);
    }
}
