import * as React from 'react';
import { Field, FieldConfig, useField, useFormikContext } from 'formik';
import { FormElement } from '@formium/client';
import cn from 'classnames';

export function Label({
  hasError,
  ...props
}: JSX.IntrinsicElements['label'] & { hasError?: boolean }) {
  return (
    <label
      className={cn('block font-medium text-lg md:text-base leading-5', {
        'text-red-700': hasError,
        'text-gray-900': !hasError,
      })}
      {...props}
    />
  );
}

const ErrorMessage = (props: JSX.IntrinsicElements['div']) => {
  return (
    <div className="rounded-b-md bg-red-100 py-1 px-2">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-3 w-3 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-2">
          <div
            className="text-sm leading-5 font-medium text-red-800"
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export function TextField<V>({
  required,
  id,
  label,
  description,
  placeholder = 'Type your answer here',
  ...props
}: FieldConfig & {
  id: string;
  label: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
}) {
  const [field, meta] = useField(props);
  const hasError = !!meta.error && !!meta.touched;
  return (
    <div className={cn({ shake: hasError })}>
      <Label hasError={hasError} htmlFor={id}>
        {label} {!required ? <small>(optional)</small> : null}
      </Label>
      {description && (
        <div className="text-sm leading-5 text-gray-500">{description}</div>
      )}
      <input
        {...field}
        type="text"
        id={id}
        className={cn(
          'form-input relative mt-1 block w-full transition duration-150 ease-in-out ',
          {
            'border-red-300  focus:shadow-outline-red!important': hasError,
            'shadow-sm': !hasError,
          }
        )}
        placeholder={placeholder}
        aria-describedby={`${id}-error`}
      />
      {hasError ? (
        <ErrorMessage id={`${id}-error`}>{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
}

export function TextareaField<V>({
  required,
  id,
  label,
  description,
  placeholder = 'Type your answer here',
  ...props
}: FieldConfig & {
  id: string;
  label: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
}) {
  const [field, meta] = useField(props);
  const hasError = !!meta.error && !!meta.touched;
  return (
    <div>
      <Label hasError={hasError} htmlFor={id}>
        {label} {!required ? <small>(optional)</small> : null}
      </Label>
      {description && (
        <div className="text-sm leading-5 text-gray-600">{description}</div>
      )}
      <textarea
        {...field}
        id={id}
        className={cn(
          'form-textarea relative mt-1 block w-full transition duration-150 ease-in-out ',
          {
            'border-red-300  focus:shadow-outline-red!important': hasError,
            'shadow-sm': !hasError,
          }
        )}
        placeholder={placeholder}
        rows={5}
        aria-describedby={`${id}-error`}
      />
      {hasError ? (
        <ErrorMessage id={`${id}-error`}>{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
}

export function DateField<V>({
  required,
  description,
  ...props
}: FieldConfig & {
  id: string;
  label: string;
  required?: boolean;
  min?: string;
  max?: string;
  description?: string;
}) {
  const [field, meta] = useField(props);
  return (
    <div>
      <Label htmlFor={props.id}>
        {props.label} {!required ? <small>(optional)</small> : null}
      </Label>
      {description && (
        <div className="text-sm leading-5 text-gray-600">{description}</div>
      )}
      <input
        {...field}
        {...props}
        type="date"
        aria-describedby={`${props.id}-error`}
      />
      {!!meta.error && !!meta.touched ? (
        <ErrorMessage id={`${props.id}-error`} data-error="true">
          {meta.error}
        </ErrorMessage>
      ) : null}
    </div>
  );
}

export const RadioGroupField = React.memo<
  FieldConfig & {
    label: string;
    id: string;
    name: string;
    required?: boolean;
    choices: Array<{ id: string; title: string }>;
    description?: string;
  }
>(({ label, id, name, choices, required, description, ...props }) => {
  const [_, meta] = useField({ name });
  const hasError = !!meta.error && !!meta.touched;
  return (
    <fieldset className={cn({ shake: hasError })}>
      <legend
        className={cn('font-medium text-lg md:text-base leading-5  ', {
          'text-red-700': hasError,
          'text-gray-900': !hasError,
        })}
        id={id}
      >
        {label} {!required ? <small>(optional)</small> : null}
      </legend>
      {description && (
        <div className="text-sm leading-5 text-gray-600">{description}</div>
      )}
      <div className="mt-2 -mx-1">
        {choices &&
          choices.length > 0 &&
          choices.map((c: any) => (
            <label
              className="flex items-center rounded active:bg-blue-50 py-1 w-auto px-1"
              key={c.id}
            >
              <Field
                aria-describedby={`${id}-error`}
                value={c.title}
                type="radio"
                className="form-radio transition duration-150 ease-in-out h-5 w-5 md:h-4 md:w-4"
                name={name}
                id={c.id}
              />
              <span className="ml-3">
                <span className="block leading-5 text-gray-700">{c.title}</span>
              </span>
            </label>
          ))}
      </div>
      {hasError ? (
        <ErrorMessage id={`${id}-error`}>{meta.error}</ErrorMessage>
      ) : null}
    </fieldset>
  );
});

export function CheckboxGroupField<V>({
  label,
  id,
  name,
  choices,
  required,
  description,
  ...props
}: FieldConfig & {
  label: string;
  id: string;
  required?: boolean;
  name: string;
  choices: Array<{ id: string; title: string }>;
  description?: string;
}) {
  const formik = useFormikContext();
  const meta = formik.getFieldMeta(name);
  const hasError = !!meta.error && !!meta.touched;
  return (
    <div className={cn({ shake: hasError })}>
      <div
        className={cn('font-medium text-lg md:text-base leading-5', {
          'text-red-700': hasError,
          'text-gray-900': !hasError,
        })}
        id={id}
      >
        {label} {!required ? <small>(optional)</small> : null}
      </div>
      {description && (
        <div className="text-sm leading-5 text-gray-600">{description}</div>
      )}
      <div className="mt-2 -mx-1" role="group" aria-labelledby={id}>
        {choices &&
          choices.length > 0 &&
          choices.map((c: any) => (
            <label
              className="flex items-center rounded active:bg-blue-50 py-1 w-auto px-1"
              key={c.id}
            >
              <Field
                {...props}
                role="checkbox"
                value={c.title}
                className="form-checkbox transition duration-150 ease-in-out h-5 w-5 md:h-4 md:w-4"
                type="checkbox"
                name={name}
                id={c.id}
              />
              <span className="ml-3">
                <span className="block leading-5 text-gray-700">{c.title}</span>
              </span>
            </label>
          ))}
      </div>
      {!!meta.error && !!meta.touched ? (
        <ErrorMessage id={`${id}-error`}>{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
}

function SubmitButton(props: any) {
  return (
    <button
      type="submit"
      className={cn(
        'inline-flex justify-center  w-full md:w-auto py-3 px-6 border border-transparent  leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out',
        { 'opacity-50 cursor-not-allowed': props.disabled }
      )}
      {...props}
    />
  );
}

function Button(props: any) {
  return (
    <button
      className="inline-flex justify-center w-full md:w-auto py-3 px-6 border border-gray-300 rounded-md  leading-6 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      type="button"
      {...props}
    />
  );
}

function Header({
  page: page,
  pageIndex: pageIndex,
}: {
  page: FormElement;
  pageIndex: number;
}) {
  return (
    <div>
      <div className="mx-auto max-w-lg py-8  container">
        {page.title ? (
          pageIndex === 0 ? (
            <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              {page.title}
            </h1>
          ) : (
            <h2 className="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              {pageIndex + 1}. {page.title}
            </h2>
          )
        ) : null}
        {page.description ? <div>{page.description}</div> : null}
      </div>
    </div>
  );
}

function ElementWrapper(props: any) {
  return (
    <div
      className="grid grid-cols-1 row-gap-8 md:row-gap-6 mx-auto max-w-lg container my-4"
      {...props}
    />
  );
}
function FooterWrapper(props: any) {
  return (
    <div
      className=" mx-auto max-w-lg container my-8 md:flex md:justify-between md:items-center grid grid-cols-1 row-gap-2"
      {...props}
    />
  );
}

export const FormiumComponents = {
  ShortText: TextField,
  LongText: TextareaField,
  Date: DateField,
  Email: TextField,
  Url: TextField,
  MultipleChoice: RadioGroupField,
  Checkboxes: CheckboxGroupField,
  SubmitButton,
  Button,
  Header,
  // PageWrapper,
  ElementWrapper,
  FooterWrapper,
};
