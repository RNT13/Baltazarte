'use client';

import Loading from '@/app/(public)/loading';
import {
  useDeleteAddressMutation,
  useGetDefaultAddressQuery,
  useGetUserAddressesQuery,
  useSetDefaultAddressMutation,
  useVerifyUserQuery
} from '@/redux/slices/apiSlice';
import { MinorTextH4, TitleH3 } from '@/styles/globalStyles';
import { getErrorMessage } from '@/utils/errorUtils';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import AddressForm from '../AddressForm/AddressForm';
import Button from '../Button/Button';
import {
  AddressCardBox,
  AddressCardText,
  AddressCardTitle,
  AddressListContainer,
  LoadingOverlay,
  ManagerContainer
} from './AddressManagerStyles';

interface AddressManagerProps {
  onAddressSelect?: (addressId: string | null) => void;
}

export default function AddressManager({ onAddressSelect }: AddressManagerProps) {
  const { data: user, isLoading: isUserLoading } = useVerifyUserQuery();
  const userId = user?.id;

  const { data: addresses, isLoading: isAddressesLoading } = useGetUserAddressesQuery(userId!, { skip: !userId });
  const { data: defaultAddress } = useGetDefaultAddressQuery(userId!, { skip: !userId });

  const [setDefaultAddress, { isLoading: isSettingDefault }] = useSetDefaultAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    } else if (addresses && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    } else {
      setSelectedAddressId(null);
    }
  }, [defaultAddress, addresses]);

  useEffect(() => {
    onAddressSelect?.(selectedAddressId);
  }, [selectedAddressId, onAddressSelect]);

  const handleDelete = async (addressId: string, addressLabel: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!userId) return;

    if (window.confirm(`Tem certeza que deseja deletar o endereço "${addressLabel}"?`)) {
      try {
        await deleteAddress({ userId, id: addressId }).unwrap();
        toast.success(`Endereço "${addressLabel}" deletado com sucesso!`);

      } catch (error) {
        const errorMessage = getErrorMessage(error, 'Falha ao deletar o endereço.');

        console.error("Erro detalhado ao deletar endereço:", error);

        toast.error(errorMessage);
      }
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!userId || isSettingDefault || defaultAddress?.id === addressId) return;

    try {
      await setDefaultAddress({ userId, addressId }).unwrap();
      setSelectedAddressId(addressId);
      toast.success("Endereço definido como principal!");
    } catch (err) {
      console.error("Erro ao definir endereço principal:", err);
      toast.error("Não foi possível definir o endereço como principal.");
    }
  };

  if (isUserLoading || isAddressesLoading) {
    return <Loading />;
  }

  return (
    <ManagerContainer>
      <AddressListContainer>
        {addresses && addresses.length > 0 ? (
          addresses.map((address) => {
            const isCurrentlySettingDefault = isSettingDefault && selectedAddressId === address.id;
            return (
              <AddressCardBox key={address.id} $isSelected={address.id === defaultAddress?.id} onClick={() => handleSetDefault(address.id)}              >
                {isCurrentlySettingDefault && <LoadingOverlay>Salvando...</LoadingOverlay>}
                <div>
                  <AddressCardTitle>
                    <TitleH3>{address.label}</TitleH3>
                    {address.id === defaultAddress?.id && <TitleH3> (Principal)</TitleH3>}
                  </AddressCardTitle>
                  <AddressCardText>
                    <p>{address.street}, {address.number}</p>
                    {address.complement && <p>{address.complement}</p>}
                    <p>{address.city} - {address.state}</p>
                    <p>{address.zipCode}</p>
                  </AddressCardText>
                </div>
                <Button variant="ghost" size="xs" title="Excluir" leftIcon={<FaTrashAlt />} loading={isDeleting} onClick={(e) => handleDelete(address.id, address.label, e)} />
              </AddressCardBox>
            );
          })
        ) : (
          <MinorTextH4>Nenhum endereço cadastrado.</MinorTextH4>
        )}
      </AddressListContainer>

      <AddressForm />
    </ManagerContainer>
  );
}
