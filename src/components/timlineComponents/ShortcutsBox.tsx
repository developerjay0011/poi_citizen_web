'use client'
import { CommonBox } from '@/utils/CommonBox'
import { FC } from 'react'
import { FaBell, FaClipboard, FaPowerOff, FaUser } from 'react-icons/fa'
import { ShortcutBtn } from '@/utils/ShortcutBtn'
import { cusDispatch } from '@/redux_store/cusHooks'
import { HiLightBulb } from 'react-icons/hi'
import { FaHandshakeAngle } from 'react-icons/fa6'
import { BiSolidMessageSquareError } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'
import { GenerateId } from '@/utils/utility'
import { authActions } from '@/redux_store/auth/authSlice'

interface ShortcutsBoxProps {}

class Shortcut {
  id = GenerateId();
  Icon: IconType;
  title: string;
  route: string;

  constructor(Icon: IconType, title: string, route: string) {
    this.Icon = Icon;
    this.title = title;
    this.route = route;
  }
}

const Shortcuts: Shortcut[] = [
  new Shortcut(FaClipboard, 'feed', '/user'),
  new Shortcut(FaUser, 'my profile', '/user/profile'),
  // new Shortcut(FaBell, 'notifications', `/user/profile/notifications`),
  new Shortcut(
    BiSolidMessageSquareError,
    'complaints',
    '/user/profile/complaints'
  ),
  new Shortcut(FiEdit, 'requests', '/user/profile/requests'),
  new Shortcut(
    FaHandshakeAngle,
    'contributions',
    '/user/profile/contributions'
  ),
  new Shortcut(HiLightBulb, 'suggestions', '/user/profile/suggestions'),
]

export const ShortcutsBox: FC<ShortcutsBoxProps> = () => {
  const dispatch = cusDispatch()

  return (
    <CommonBox title="shortcuts">
      <div className="flex flex-col py-4 gap-5 pr-16 font-normal">
        {Shortcuts.map((el) => (
          <ShortcutBtn {...el} key={el.id} />
        ))}
        <button onClick={() => dispatch(authActions.logOut())}>
          <ShortcutBtn Icon={FaPowerOff} title="logout" route="/" />
        </button>
        <button
          type="button"
          className="flex items-center gap-4 hover:text-orange-600 transition-all text-sky-950"
          onClick={() => setShowConfirmBox(true)}
        >
          <FaPowerOff /> Deactive Account
        </button>

        <button
          type="button"
          className="flex items-center gap-4 hover:text-orange-600 transition-all text-sky-950"
          onClick={() => setShowCloseConfirmBox(true)}
        >
          <FaPowerOff /> Close Account
        </button>
        <AnimatePresence mode="wait">
          {showConfirmBox && (
            <ConfirmDialogBox
              noAllowed={false}
              onCancel={() => {
                setShowConfirmBox(false);
                onClose();
              }}
              onOk={deactiveAccountHandler}
            />
          )}
          {showCloseConfirmBox && (
            <ConfirmDialogBox
              noAllowed={false}
              onCancel={() => {
                setShowCloseConfirmBox(false);
                onClose();
              }}
              onOk={CloseAccountHandler}
            />
          )}
        </AnimatePresence>
      </div>
    </CommonBox>
  );
};
