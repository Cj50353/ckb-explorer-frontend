import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAppState, useDispatch } from '../../contexts/providers'
import { AppActions } from '../../contexts/providers/reducer'
import { changeLanguage } from '../../utils/i18n'
import WhiteDropdownIcon from '../../assets/white_dropdown.png'
import BlueDropUpIcon from '../../assets/blue_drop_up.png'
import GreenDropUpIcon from '../../assets/green_drop_up.png'
import { isMainnet } from '../../utils/chain'

export const HeaderLanguagePanel = styled.div`
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #040607;
  font-weight: 500;
  position: fixed;
  position: -webkit-fixed;
  z-index: 1000;
  right: 280px;
  top: 17px;

  @media (max-width: 1920px) {
    right: 140px;
  }

  @media (max-width: 1440px) {
    right: 48px;
  }

  @media (max-width: 1000px) {
    right: 30px;
  }

  @media (max-width: 800px) {
    right: 24px;
  }

  @media (max-width: 750px) {
    right: 30px;
  }

  .current__language {
    padding: 0 8px;
    height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      color: white;
      font-size: 14px;
    }

    > img {
      width: 7.9px;
      height: 4.8px;
    }
  }

  .select__language {
    height: 28px;
    cursor: pointer;
    display: ${(props: { showDropdown: boolean }) => (props.showDropdown ? 'block' : 'none')};

    .select__separate {
      height: 1px;
      width: 86%;
      margin-left: 7%;
      background: #f7f7f7;
    }

    .select__language__text {
      display: flex;
      height: 22px;
      align-items: center;
      color: white;
      font-size: 13px;
      width: 100%;
      padding: 0 8px;
      margin: 3px 0;
    }

    &: hover {
      .select__language__text {
        background-color: #848484;
      }
    }
  }

  @media (max-width: 700px) {
    width: 43px;
    margin-left: 8px;
    border-radius: 3px;
    right: 20px;
    top: 12px;

    @media (max-width: 400px) {
      right: 10px;
    }

    .current__language {
      padding: 0 4px;
      height: 18px;

      > div {
        color: white;
        font-size: 9px;
      }

      > img {
        width: ${(props: { showDropdown: boolean }) => (props.showDropdown ? '4px' : '6px')};
        height: ${(props: { showDropdown: boolean }) => (props.showDropdown ? '6px' : '4px')};
      }
    }

    .select__language {
      height: 19px;
      background-color: #040607;

      .select__language__text {
        height: 18px;
        line-height: 18px;
        font-size: 9px;
        padding: 0 4px;
        margin: 0;
      }
    }
  }
`

const getDropdownIcon = () => {
  return isMainnet() ? GreenDropUpIcon : BlueDropUpIcon
}

const showLanguage = (lan: 'en' | 'zh') => {
  return lan === 'en' ? 'EN' : '中(简)'
}

export default () => {
  const { app } = useAppState()
  const dispatch = useDispatch()
  const { language } = app
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [languages, setLanguages] = useState({
    current: language === 'zh' ? 'zh' : 'en',
    select: language === 'zh' ? 'en' : 'zh',
  } as { current: 'en' | 'zh'; select: 'en' | 'zh' })

  useEffect(() => {
    setLanguages({
      current: language === 'zh' ? 'zh' : 'en',
      select: language === 'zh' ? 'en' : 'zh',
    })
  }, [language])

  return (
    <HeaderLanguagePanel showDropdown={showLanguageDropdown}>
      <div
        className="current__language"
        onKeyDown={() => {}}
        onClick={() => {
          setShowLanguageDropdown(!showLanguageDropdown)
        }}
        role="button"
        tabIndex={-1}
      >
        <div>{showLanguage(languages.current)}</div>
        <img src={showLanguageDropdown ? getDropdownIcon() : WhiteDropdownIcon} alt="select icon" />
      </div>
      <div
        className="select__language"
        onKeyDown={() => {}}
        onClick={() => {
          dispatch({
            type: AppActions.UpdateAppLanguage,
            payload: {
              language: languages.select,
            },
          })
          changeLanguage(languages.select)
          setShowLanguageDropdown(!showLanguageDropdown)
          setLanguages({
            current: languages.select,
            select: languages.current,
          })
        }}
        role="button"
        tabIndex={-1}
      >
        <div className="select__separate" />
        <div className="select__language__text">{showLanguage(languages.select)}</div>
      </div>
    </HeaderLanguagePanel>
  )
}
