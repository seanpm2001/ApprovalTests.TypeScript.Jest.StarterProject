import {SingleWrapper, ThreadedWrapper, Wrapper} from "./Wrapper";

import {LoggingInstance} from "./LoggingInstance";
import {StringWrapper} from "./StringWrapper";


export class SimpleLogger {


    static _wrapper: Wrapper<LoggingInstance> = new SingleWrapper(new LoggingInstance())

    static show_queries(show) {
        this._wrapper.get().show_queries(show);

    }

    static show_markers(show) {
        this._wrapper.get().show_markers(show);
    }

    static show_events(show) {
        this._wrapper.get().show_events(show);
    }

    static show_messages(show) {
        this._wrapper.get().show_messages(show);
    }

    static show_variables(show) {
        this._wrapper.get().show_variables(show);

    }

    static show_hour_glass(show) {
        this._wrapper.get().show_hour_glass(show);

    }

    static register_logger(log_method: (string) => void): void {
        this._wrapper.get().logger = log_method
    }

    static log_to_string(log_separate_threads: boolean = true): StringWrapper {
        //with threading.Lock():
        if (log_separate_threads && this._wrapper instanceof SingleWrapper) (
            this._wrapper = new ThreadedWrapper(() => new LoggingInstance())
        )
        return SimpleLogger._wrapper.get().log_to_string()

    }

    static use_markers(code: () => void): void {
        this._wrapper.get().use_markers(1, code);
    }

    static variable(name: string, value: any, show_types: boolean = false) {
        SimpleLogger._wrapper.get().variable(name, value, show_types)
    }

    static hour_glass() {
        this._wrapper.get().hour_glass();

    }

    static show_all(show: boolean) {
        this._wrapper.get().show_all(show);
    }

    static event(text: string) {
        this._wrapper.get().event(text);

    }

    static query(queryText: string) {
        this._wrapper.get().query(queryText);
    }

    static message(messageText: string) {
        this._wrapper.get().message(messageText);

    }

    static warning(exception) {
        this._wrapper.get().warning(exception)

    }
}