"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input, Loading, Typography } from "@components";
import { scrollToInput } from "@utils";
import { TypographyType } from "@components/typography/Constant";

type InputFieldsType = {
  id: string,
  label: string,
  placeholder: string,
  maxLength: number,
}

const inputFields: InputFieldsType[] = [
  {
    id: "sellerName",
    label: "매도인명(법인명)",
    placeholder: "매도인 또는 법인명 입력",
    maxLength: 30,
  },
  {
    id: "sellerNumber",
    label: "매도인 생년월일(법인등록번호)",
    placeholder: "생년월일 또는 법인등록번호 6자리 입력",
    maxLength: 6,
  }
]

export default function SellerInfo() {
  const [form, setForm] = useState({
    sellerName: "",
    sellerNumber: "",
  });

  const isDisabled = Object.values(form).some(
    (field) => field === ""
  )

  const inputMonitor = (event: ChangeEvent<HTMLFormElement>) => {
    const { id, value } = event.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: API 통신 로직 추가
  };

  console.log("🍏 form", form)

  return (
    <>
      {/* TODO: API 통신 로직 개발 후 로딩 추가 */}
      <section className="flex flex-col justify-between grow w-full h-full">
        <div className="flex flex-col flex-1">
          <Typography
            type={Typography.TypographyType.H1}
            color="text-kos-gray-800"
          >
            매도인 정보를 입력하고<br/>
            해당하는 서류를 제출해 주세요
          </Typography>

          <Typography
            type={TypographyType.H2}
            color={"text-kos-gray-800"}
            className="pt-6 pb-3"
          >
            매도인 정보
          </Typography>

          <form
            onChange={inputMonitor}
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend className="sr-only">매도인 정보 입력 양식</legend>
              <div className="flex flex-col gap-y-6">
                {inputFields.map((field, index) => {
                  const {
                    id,
                    label,
                    placeholder,
                    maxLength
                  } = field;

                  return (
                    <div key={id} className="flex flex-col gap-y-1 text-[0px]">
                      <label htmlFor={id} className="text-xs font-semibold text-kos-gray-600">{label}</label>
                      <Input.InputField
                        id={id}
                        name={id}
                        inputType={index === 1 ? "money" : "text"}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        thousandSeparator={false}
                        onFocus={scrollToInput}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="fixed w-full left-0 bottom-0 flex p-4 bg-kos-white">
                <Button.CtaButton
                  type="submit"
                  size="XLarge"
                  state="On"
                  disabled={isDisabled || form.sellerNumber.length !== 6}
                >
                  서류 제출하기
                </Button.CtaButton>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
